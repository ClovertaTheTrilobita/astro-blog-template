---
title: "How Does an Operating System Organize Your Files? — File Management"
pubDate: 2026-10-31
description: 'It is worth noting that whenever you open a file, a file gets opened.'
author: "Cloverta"
image:
    url: "https://files.seeusercontent.com/2026/10/30/Udc9/pasted-image-1793374825970.webp"
    alt: "tty"
tags: ["Study Notes", "Operating Systems"]
---

<p style="font-size: 0.85rem;"><i><sub>Content translated by <a href="https://chatgpt.com/">ChatGPT</a>.</sub></i></p>

## I. The Physical Structure of Files

Anyone who regularly buys secondhand hard drives knows the first thing to do after picking up a drive of mysterious origin on Xianyu, a secondhand marketplace: scan it for bad sectors. Typically, scanning software divides the disk into small regions and checks whether the corresponding hardware works correctly by reading and writing data in each region.

Operating systems organize files using a similar idea. They divide the disk into **disk blocks**, and all disk reads and writes are performed **in units of disk blocks**. A disk block is generally the same size as a memory page. <sub>👉 Further reading: <b>[How Memory Paging Works](/en/posts/post-6/)</b>.</sub>

> Some knowledgeable readers may have noticed that hard drives are divided into **sectors**. A disk block generally consists of several **sectors with consecutive logical addresses**.

In other words, the files you save are cut into little pieces and placed in disk blocks. So how should we allocate those blocks?

### 1. Contiguous Allocation

The most obvious approach is to find a contiguous stretch of space on the disk and put the file straight into it. Suppose we have a disk like this:

<img src="https://files.seeusercontent.com/2026/10/30/E9ty/33318d2.png" alt="Example disk layout" title="Example disk layout" style="zoom:80%;" >

<p align="center"><sup>Orange indicates occupied blocks; white indicates free blocks.</sup></p>

You have a file that takes up about four blocks. As you can see, all we need to do is put it in blocks 5–8. Simple enough.

<img src="https://files.seeusercontent.com/2026/10/30/bAp4/2.png" alt="Disk layout after allocating a file" title="Disk layout after allocating a file" style="zoom:80%;" >

<p align="center"><sup>Green indicates the blocks allocated to this file.</sup></p>

But this creates a problem. If most of our files take up more than four blocks, we may eventually find that we cannot save any new files even though plenty of free blocks remain. In other words, contiguous allocation produces a lot of **external fragmentation**. And if we want to modify a file—for example, by inserting a block's worth of content in the middle—we have to copy the entire file, add the new content, and find a larger contiguous region to put it in. That is terrible for performance.

### 2. Linked Allocation

Borrowing an idea from data structures, we can store a file like a linked list. This allows its blocks to be scattered across the disk.

#### 1) Implicit Linking

We can reserve part of each disk block to store a **pointer to the next block**, as shown below.

<img src="https://files.seeusercontent.com/2026/10/30/Pwy1/3.png" alt="Implicitly linked disk blocks" title="Implicitly linked disk blocks" style="zoom:80%;" >

The operating system manages these pointers, making them completely transparent to the user.

> **Transparent** means that the user does not notice the underlying mechanism.
>
> Here, the user sees a complete, continuous file, while the operating system automatically splits it into blocks and stores them in scattered locations.

The disadvantages of implicit linking are equally obvious.

1. To access a block in the middle or at the end of a file, we have to follow the chain from the first block all the way to the target. Random access is inefficient.
2. Reliability is poor. If any pointer in the chain is damaged, all subsequent data becomes inaccessible.
3. The pointers take up space inside the blocks, reducing storage efficiency.

To alleviate these problems, we can combine **several contiguous blocks** into a **cluster** and allocate and link files **in units of clusters**. This greatly reduces the number of pointers and improves I/O performance. However, if a file's size is not a multiple of the cluster size, some space in the final cluster is wasted, creating internal fragmentation.

#### 2) Explicit Linking

Explicit linking uses the famous <b>File Allocation Table (FAT)</b>. Instead of storing pointers inside disk blocks, it maintains a **file allocation table** in memory, with entries identifying the next block in each chain.

<img src="https://files.seeusercontent.com/2026/10/30/hl2K/fat-1.png" alt="File allocation table" title="File allocation table" style="zoom:75%;" >

In the diagram above, block 2 is followed by block 5, then block 6, and finally block 3. Since block 3 is the last block, its entry is marked -1. Free blocks are marked -2. That is right: the FAT records both the linked structure of files and which blocks are free. This means the operating system can also use it to manage free disk space.

Suppose a process wants to store two blocks of data. The operating system only needs to find two entries whose values are -2 and allocate the corresponding blocks to that process.

Compared with implicit linking, explicit linking allows the system to locate blocks in the middle or at the end of a file without reading through the file's disk blocks from the beginning. The FAT is loaded into memory at startup, which can significantly improve lookup and access performance. The downside is that a larger disk requires a larger FAT, increasing memory overhead.

### 3. Indexed Allocation

In practice, though, we usually use only a small portion of the disk at any given time. Nobody opens 4 TB of files on the screen to work on all at once. So we can refine the FAT idea: load only the block numbers for the files currently in use into memory. This is the idea behind indexed allocation.

#### 1) Single-Level Indexed Allocation

The system allocates a dedicated **index block**, or **index table**, to each file and records all of the file's disk block numbers in it. When accessing the file, it first loads the index table into memory, then uses the recorded block numbers to locate the file's disk blocks.

<img src="https://files.seeusercontent.com/2026/10/30/Chc3/c7fe9ac.png" alt="Indexed allocation" title="Indexed allocation" style="zoom:80%;" >

<p align="center"><sup>Purple indicates the block storing the index table: the index block.</sup></p>

Unlike FAT, this approach does not require a single table covering every block on the entire disk, significantly reducing memory overhead. It also supports random access and avoids external fragmentation. Its drawback is similar to FAT's: the more blocks a file occupies, the more index entries it needs, so the index table grows with the file. We could link several index tables together, but that brings us back to something like implicit linking, with inefficient access. At the other extreme, if a small file occupies only a few blocks, its index table might contain just a dozen or so bytes of entries, yet the operating system still allocates a full index block, wasting space.

#### 2) Multilevel Indexing

Computers are basically nesting dolls. If a large file needs too many index blocks, why not create an index table for the index blocks?

<img src="https://files.seeusercontent.com/2026/10/30/g6Lf/drawio-1.png" alt="Multilevel indexing" title="Multilevel indexing" style="zoom: 25%;" >

<p align="center"><sup>Two-level indexed allocation</sup></p>

Much like multilevel page tables in memory management, accessing data starts with the top-level index. After identifying the range containing the desired block, we consult the next index level, continuing until we obtain the exact block number and retrieve that block from disk.

Suppose a disk block is 4 KB and each block number occupies 4 B. An index block can then hold 1,024 block numbers. With two-level indexing, the maximum supported file size is $1024^2\times4KB=4GB$.

Multilevel indexing can greatly improve lookup efficiency for large files, but it also increases the number of disk I/O operations required to retrieve a block. For small files, lookup becomes noticeably less efficient. If the system needs to access many small files, it can perform worse than single-level indexing.

#### 3) Hybrid Indexing

Computing is always about tradeoffs. To accommodate both large and small files, we can combine single-level and multilevel indexing, choosing the most suitable allocation strategy as needed.

The UNIX <b>inode (index node)</b> is a good example.

<img src="https://files.seeusercontent.com/2026/10/30/skO5/inodedrawio.png" alt="Example inode layout" title="Example inode layout" style="zoom:25%;" >

<p align="center"><sup>An example inode</sup></p>

In this layout, an inode has 13 address entries: the first 10 are direct block pointers, while the last three point to single-, double-, and triple-indirect indexes. With 4 KB blocks, all block numbers for a file no larger than 40 KB can be obtained directly from the inode. When all four addressing methods are used, the maximum file size this inode can represent is $4KB\times(10+1024+1024^2+1024^3)=40KB+4MB+4GB+4TB$.

## II. Directories

When using a computer, we cannot possibly memorize the disk block number of every file's inode. Good grief, that would take superpowers. Anyone who uses a computer knows what we actually do: give files names, save them, and find the matching filename whenever we want to open one.

<img src="https://files.seeusercontent.com/2026/10/30/Df8m/pasted-image-1793386233311.webp" alt="My computer's home directory" title="My computer's home directory" style="zoom: 25%;" >

<p align="center"><sup>My computer's home directory</sup></p>

### 0. Directory Files

In an operating system, a directory is itself a special kind of file. It stores information about the files it contains.

### 1. File Control Blocks

To make files easier to manage, we introduce a data structure called the <b>File Control Block (FCB)</b>.

Like the Process Control Block (PCB) used in process management, an FCB stores the information needed to manage a file. It allows us to **access files by name**. Each file has an FCB, and <b>the collection of FCBs forms a directory file</b>.

An FCB mainly contains:

- **Basic information**: filename, physical location, and so on.
- **Access control information**: file owner and user access permissions.
- **Usage information**: creation and modification times, and so on.

<img src="https://files.seeusercontent.com/2026/10/30/Evk0/pasted-image-1793387031306.webp" alt="Detailed file information" title="Detailed file information" style="zoom:25%;" >

<p align="center"><sup>Detailed file information</sup></p>

- For a file system using **contiguous allocation**, the FCB records the starting block number and the total number of blocks occupied.
- For **implicit linked allocation**, it records pointers to the file's first and last blocks.
- For **explicit linking**, only the starting block number is needed.

### 2. Inodes

FCBs? Those are practically ancient history. Think about it: when your computer contains an enormous collection of “study materials,” storing all that FCB information in directories makes them huge. To find a file, the system has to read directory entries block by block, dramatically slowing down lookups.

The solution is to store filenames separately from the rest of the file information. Each directory entry contains a pointer to the block holding that information. During a lookup, only filenames and their corresponding pointers need to be loaded into memory. This greatly reduces directory size and the number of disk I/O operations.

As mentioned earlier, UNIX stores a file's basic information in an inode, while directory files contain only **filenames** and **inode numbers**. When the system needs to access a file, it uses the corresponding inode to load the file data into memory. To support persistent storage and efficient access, file systems use two forms of inode.

#### 1) On-Disk Inodes

As the name suggests, these are stored on disk. Each file has a unique on-disk inode.

| Field | Description |
| ----- | ----------- |
| Owner identifier | Identifies the user or group that owns the file. |
| File type | Indicates whether it is a regular file, a directory, or a special file. |
| Access permissions | Specifies access permissions for the owner, authorized users, and other users. |
| Physical addresses | Uses 13 address entries to locate the blocks containing the file's data. |
| File length | The actual file size in bytes. |
| Link count | Counts how many hard links in the file system point to the file. |
| File timestamps | Records file access and modification times, as well as inode modification time. |

> **Hard link**: Two directory entries point to the same inode, allowing a file to be shared. We will discuss this in detail later.

#### 2) In-Memory Inodes

When a file is opened, the operating system loads its on-disk inode into memory and adds some runtime state. In addition to the on-disk information, it includes:

| Field | Description |
| ----- | ----------- |
| Inode number | Uniquely identifies the inode in memory. |
| Status | Indicates whether the inode is locked or modified. |
| Reference count | Tracks how many processes are accessing the inode; it can be released only when the count reaches zero. |
| Logical device number | Identifies the logical device containing the file system, supporting environments with multiple file systems. |
| Link pointers | Point to free lists and hash queues, helping the kernel manage and reclaim inodes. |

### 3. Directory Structure

Modern operating systems generally use a tree-shaped directory structure.

<img src="https://files.seeusercontent.com/2026/10/30/Lo6v/pasted-image-1793389225676.webp" alt="Example directory tree" title="Example directory tree" style="zoom:25%;" >

<p align="center"><sup>The structure of a directory</sup></p>

Users of systems such as macOS or Linux should be familiar with this. In a directory tree, users identify files by their **pathnames**. Paths can be **absolute** or **relative**. An absolute path starts at the root directory, such as `/Users/cloverta/Projects/cellpose-web/backend/config.yaml`. A relative path starts at the user's current directory. If the user is currently in `cellpose-web`, the relative path to that file is `backend/config.yaml`.

Each file has a unique absolute path in the directory tree. In UNIX, a path beginning with `/` is absolute, and `/` represents the root directory.

## III. File Sharing

File sharing allows multiple users to access the same file while keeping only one copy in the system.

### 1) Soft Links (Symbolic Links)

Soft links are probably the most familiar kind. Why? Think of the Windows shortcuts we use every day: they offer a familiar example of accessing a file through a reference to its location.

To create a soft link, the system creates a new file of type LINK containing only the pathname of the target file. When a user accesses the link, the operating system recognizes its LINK type and follows the recorded pathname through the directory hierarchy. Once it finds the target, it performs the requested reads or writes.

<img src="https://files.seeusercontent.com/2026/10/30/vlO3/softlinkdrawio-2.png" alt="Symbolic link diagram" title="Symbolic link diagram" style="zoom:45%;" >

With symbolic links, **only the directory containing the original file has a pointer to its inode**; the other directories sharing it store only its pathname. If the original file is deleted, the link remains visible in the other directory, but attempting to access the target through it fails. Deleting the symbolic link does not affect the original file's inode.

Following the pathname requires traversing directories, potentially involving multiple disk accesses and increasing access overhead. The symbolic link is also a separate file, so both it and its inode consume disk space.

> To share a file over a network using a symbolic-link-style reference, record the network address of the machine hosting it along with its file path.

### 2) Hard Links

Hard links are **based on inodes**: the entry in directory B points directly to the file's inode.

<img src="https://files.seeusercontent.com/2026/10/30/Cej7/hardlinkdrawio.png" alt="Hard link diagram" title="Hard link diagram" style="zoom: 59%;" >

When directory A deletes its entry for the file, the system does not immediately remove the physical file. It first decreases the link counter by one; the file can be deleted only when the counter reaches zero. In other words, as long as the counter is greater than zero, the system retains the file and its inode.

## IV. File Operations

I imagine 99% of people boot up an operating system to (log into some accounts) (click around with a cursor) (do things to some files). Next, let us look at how the operating system actually performs those file operations.

### 1. Opening and Closing Files

Here, opening and closing do not mean double-clicking a file. We are talking about the `open()` and `close()` system calls made by a process.

#### 1) Opening a File

If a user wants to read or write a file repeatedly, searching the directory from scratch every time would be terribly inefficient. To avoid repeated lookups, most operating systems require a file to be opened with the <b>`open()` system call</b> before it is first accessed.

The system maintains an <b>open file table</b> **in memory** to record information about currently active files. This is generally organized into two levels:

- **System-wide open file table**: Shared globally. It stores information associated with files rather than individual processes, such as disk location, file size, and access time. Each entry includes an open count tracking how many processes have the file open.
- **Per-process open file table**: Private to an individual process. It records process-specific access state, such as read/write position, access permissions, and opening mode. **Each entry points to the corresponding entry in the system-wide table**.

The <b>open</b> operation locates the directory entry using the file path, loads key information into memory, creates an open file table entry, and returns its <b>index, the file descriptor (fd)</b>, to the caller. The steps are:

1. **The process makes a system call**: It calls `open()`, supplying the operating system with the file path, opening mode, and other information.
2. **Directory lookup**: The operating system follows the supplied path through the directory hierarchy to find the corresponding FCB or inode. If the inode is not in memory, it must be read from disk.
3. **Permission checks**: The system checks whether the file and path exist, whether the user has the required access permissions, and whether the requested opening mode is valid.
4. **Create open file table entries**: Entries are established in the system-wide and per-process tables. If the relevant system-wide entry already exists, its open count is increased by one.
5. <b>Return the file descriptor (fd)</b>: The process receives a file descriptor identifying the opened file.

For subsequent operations, the caller only needs to provide the file descriptor, allowing the system to obtain the necessary information directly from memory.

<img src="https://files.seeusercontent.com/2026/10/30/qJ6x/opentlistdrawio.png" alt="Reading a file through two levels of open file tables" title="Reading a file through two levels of open file tables" style="zoom:33%;" >

<p align="center"><sup>Reading a file through the two levels of open file tables</sup></p>

#### 2) Closing a File

A process closes a file with the <b>`close()` system call</b>. The operating system then **removes** the corresponding entry from the **process's open file table** and decreases the **open count** of the matching **system-wide entry** by one.

If the count reaches zero, no process is using that entry anymore. The system can remove it and release the associated resources.

> Filenames are not part of the open file table: once a process opens a file, subsequent operations use its descriptor.

### 2. Basic File Operations

Intuitively, the things we want to do with files boil down to creating, deleting, reading, and writing them.

#### 1) Creating a File

The basic idea is: validate, allocate, reserve, and register.

1. **Validate the name and permissions**: The operating system first checks whether the filename is valid—for example, whether it contains `/`—and whether another file in the same directory already has that name. It then verifies that the user has **write permission** on the target directory. If any check fails, creation stops.
2. **Allocate an inode**: A free entry is allocated from the inode pool and its metadata initialized, including file type, initial size, access permissions, timestamps, and physical block pointers. The inode is marked as occupied.
3. **Allocate disk blocks**: Based on the expected file size, the system allocates physical blocks from its free-space management structures and records their addresses in the inode.
4. **Update file system metadata**: This includes the inode table, free-block management structures, directory size, and so on.
5. **Open the file and return a descriptor**: If the file is opened immediately after creation, the corresponding opening steps are performed.

#### 2) Deleting a File

The basic idea is: remove, reclaim, and release.

1. **Resolve the path and locate the file**: The operating system follows the pathname through the directory tree. After finding the target directory entry, it uses the inode number to obtain the file's inode and checks the user's write permission on the containing directory.
2. **Check usage state and hard link count**: Some operating systems defer physical deletion while a file is open. If its hard link count is greater than one, only the current directory entry is removed and the link count decreased by one.
3. **Remove the directory entry**: The file no longer appears in that directory, completing logical deletion.
4. **Release the inode**: Once the link count reaches zero and the file can be reclaimed, the inode is marked free and returned to the free-inode management structures.
5. **Release disk blocks**: Using the inode's block pointers, the system returns all data and index blocks to its free-space management structures.
6. **Release temporary memory resources**: These include buffers, open file table entries, kernel file objects, and so on.
7. **Update file system metadata**.

#### 3) Reading a File

Refer to the earlier diagram for the flow. First, the system looks up the filename in the directory to obtain the inode number. Once the file is open, the two levels of open file tables provide access to its disk blocks. The system reads data from the appropriate block according to the current read position, then updates that position.

#### 4) Writing a File

Similarly, after locating the data blocks through the open file tables, the system writes data to the appropriate block according to the current write position, then updates that position. If the write exceeds the space currently allocated to the file, the system dynamically allocates new blocks and updates the inode's pointers.

## V. File Protection

If someone in your family knew a little about computers, you probably spent part of your childhood in a battle of wits over sneaking in some computer time. So, <del>to keep children from swallowing the files</del>, operating systems need to protect them.

### 1. Content Protection

Suppose you want to share some ~~study materials~~ with other users while keeping certain people from seeing them. The simplest approach is **password protection**. The user sets a **password** when creating the file, and the system stores it in the FCB. Anyone accessing the file must supply the correct password. This has little overhead, but the file itself is not encrypted. ~~It keeps honest people honest, at least.~~

A more common approach is **encryption**, which requires a **key** to decrypt the contents when accessing them. A very simple example is using the key's bits to determine which bits of the file's binary data to flip. This does not require extra storage for the transformed data, but encryption and decryption incur some computational overhead.

### 2. Access Control

Imagine your relative's little terror asks to borrow your computer. They have just learned from a certain musical-note-themed video app that deleting everything under `C:\Windows\System32\` will let them rig the gacha odds in HoYoverse games! What now? Your computer is in mortal danger!

The operating system provides **access control**, allowing you to manage users' file permissions in detail.

The most common approach is **managing permissions based on user identity**. A widely used mechanism attaches an <b>Access Control List (ACL)</b> to each file and directory, specifying users and the types of access they are allowed.

A **simplified ACL** typically divides users into three categories:

- **Owner**: The user who created the file.
- **Group**: Users who need to share the file and have similar access requirements.
- **Others**: Users who are neither the owner nor members of the group.

| User category | Read | Write | Delete | Execute |
| ------------- | ---- | ----- | ------ | ------- |
| Owner | 1 | 1 | 1 | 1 |
| Group | 1 | 0 | 0 | 1 |
| Others | 0 | 0 | 0 | 0 |

When a user tries to access a file, the system **matches their identity in the priority order shown above**. Once a category matches, it does not continue to the next one. For example, if you put the little terror's account in the group, the system proceeds as follows:

1. Is the user the owner? No. Move to the next category.
2. Is the user a group member? Yes. They may read and execute, but may not write or delete.
3. Since the previous category matched, the “Others” category is skipped.
