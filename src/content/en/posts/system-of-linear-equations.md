---
title: "Vectors and Matrices in a Brutal Love Triangle II—Matrices, Vectors, and Systems of Equations"
pubDate: 2026-11-12
description: 'So that’s how you see systems of equations? They look completely different to me. I’ve sent you the post. Open it if you think you can handle it 😎'
author: "Cloverta"
image:
    url: "https://files.seeusercontent.com/2026/11/12/yf3V/145613-1-2.webp"
    alt: "ln"
tags: ["Study Notes", "Linear Algebra"]
---

<p style="font-size: 0.85rem;"><i><sub>Content translated by <a href="https://chatgpt.com/">ChatGPT</a>.</sub></i></p>

You’ve probably seen your fair share of systems of equations.

Back in middle school, our teachers showed us how to put two equations with two unknowns together and solve them.

Here’s a simple example.

$$
\begin{cases}
x_1 + x_2 = 3 \\
x_1 - x_2 = 1
\end{cases}
$$

We want to find $x_1$ and $x_2$. Add the second equation to the first and we get $2x_1=4$, so the answer is $\begin{cases} x_1 = 2 \\ x_2 = 1 \end{cases}$.

How should we think about a system like this in a vector space?

## Zero. What Is a System of Linear Equations Actually Doing?

From the previous post <sub>👉 <b>[Eigenvalues and Eigenvectors](/en/posts/eigenvectors-and-eigenvalues/)</b></sub>, we know that a system of linear equations can be written as **a matrix times a column vector of unknowns**. Our example becomes

$$
\begin{pmatrix}
1 & 1 \\
1 & -1
\end{pmatrix}
\begin{pmatrix}
x_1 \\
x_2
\end{pmatrix}
=
\begin{pmatrix}
3 \\
1
\end{pmatrix}
$$

What does this tell us?

By definition, matrix multiplication takes each row of the matrix on the left and each column of the matrix on the right, multiplies their corresponding entries, and adds the products.

Now, with an astonishing feat of concentration, compare the matrix with the original equations. The entries in the left column $\begin{pmatrix} 1 \\ 1 \end{pmatrix}$ always get multiplied by $x_1$, and the entries in the right column $\begin{pmatrix} 1 \\ -1 \end{pmatrix}$ always get multiplied by $x_2$. So what the matrix is actually doing is

$$
\begin{pmatrix} 1 \\ 1 \end{pmatrix}x_1+\begin{pmatrix} 1 \\ -1 \end{pmatrix}x_2=\begin{pmatrix} 3 \\ 1 \end{pmatrix}
$$

That’s right. The question at the heart of a system of linear equations is **whether we can choose coefficients so that a linear combination of the given vectors produces the result we want**.

More generally, suppose we have an $m\times n$ matrix $A=(\boldsymbol{\alpha_1},\boldsymbol{\alpha_2},\ldots,\boldsymbol{\alpha_n})$. Can we find coefficients $x_1,x_2,\ldots,x_n$ such that the linear combination $x_1\boldsymbol{\alpha_1}+x_2\boldsymbol{\alpha_2}+\cdots+x_n\boldsymbol{\alpha_n}$ gives us the vector $\boldsymbol{b}=(b_1,b_2,\ldots,b_m)$?

That’s how we can write any system of linear equations as

$$
\boxed{AX=\boldsymbol{b}}
$$

The linear algebra perspective puts the focus on how we combine the vectors $\boldsymbol{\alpha_i}$ and what transformation the matrix performs.

A system of linear equations gives us three questions to work with.

- **Existence.** Can we combine the vectors to get $\boldsymbol{b}$?
- **Uniqueness.** How many ways can we do it?
- **Structure of the solution set.** If there are several ways to do it, how are they related?

## One. Matrix Rank

I spent quite a while wondering where to start with systems of linear equations. After thinking it over, I decided to start with matrices.

You might have heard of the rank of a matrix. It tells us the maximum number of linearly independent columns or rows in the matrix. One way to find it is to reduce the matrix using elementary row or column operations and inspect the result.

### 1. Rank and Variables

Let’s look at a simple augmented matrix.

$$
\begin{pmatrix}
\begin{array}{cc|c}
1 & 1 & 3\\
1 & -1 & 1
\end{array}
\end{pmatrix}
$$

> An **augmented matrix** places the **coefficient matrix** and the **column vector of constants** side by side, usually with a vertical line between them.

Add the second row to the first to get

$$
\begin{pmatrix}
\begin{array}{cc|c}
2 & 0 & 4\\
1 & -1 & 1
\end{array}
\end{pmatrix}
$$

Then subtract half the first row from the second to get

$$
\begin{pmatrix}
\begin{array}{cc|c}
2 & 0 & 4\\
0 & -1 & -1
\end{array}
\end{pmatrix}
$$

Divide the first row by two and multiply the second row by $-1$.

$$
\begin{pmatrix}
\begin{array}{cc|c}
1 & 0 & 2\\
0 & 1 & 1
\end{array}
\end{pmatrix}
$$

Notice that we get the same values of $x_1$ and $x_2$ as we did by solving the equations directly.

Writing the matrix back out as equations gives us

$$
\begin{cases}
x_1 + 0 = 2 \\
0 + x_2 = 1
\end{cases}
$$

Now suppose we have a matrix like this.

$$
\begin{pmatrix}
\begin{array}{cc|c}
1 & 0 & 2\\
0 & 0 & 0
\end{array}
\end{pmatrix}
$$

The corresponding equations are

$$
\begin{cases}
x_1 + 0 = 2 \\
0 + 0 = 0
\end{cases}
$$

Here, $x_2$ can take any value.

This gives us an intuitive conclusion. **The rank of the coefficient matrix is the number of pivot variables in the system.**

> A **pivot variable**, also called a **basic variable**, corresponds to a pivot column of the coefficient matrix. In a consistent system, its value is determined once we choose the free variables.

### 2. Linear Independence and Pivot Variables

We also know that the rank is the maximum number of linearly independent columns in the matrix.

Putting that together with the previous section, we get **as many pivot variables as there are columns in a basis for the column space**.

Why should those two numbers happen to agree? Let’s start with what the matrix itself does.

#### 1) Matrix Rank and the Corresponding Linear Transformation

Suppose $A$ is an $m\times n$ matrix. Applying it to a vector $X$ gives $AX=b$. What is it doing in a vector space?

As we saw in the previous post <sub>👉 <b>[The Geometry Behind Matrix Multiplication](/en/posts/eigenvectors-and-eigenvalues/#matrix-geometry)</b></sub>, multiplying by $A$ transforms $X$ geometrically.

Think of $A$ as a machine. Feed it $X$, and it follows a rule to spit out $b$.

You might have heard that when $A$ has full column rank, $r(AB)=r(B)$.

The number of columns of $A$ gives the dimension of its input space, while its rank tells us **how many independent directions survive the transformation**. A matrix with full column rank preserves all of them.

Why? Suppose $A=(\boldsymbol{\alpha_1},\boldsymbol{\alpha_2},\boldsymbol{\alpha_3})$, where $\boldsymbol{\alpha_1}$ and $\boldsymbol{\alpha_2}$ are linearly independent and $\boldsymbol{\alpha_3}$ is a linear combination of the two. In other words,

$$
\boldsymbol{\alpha_3}=c_1\boldsymbol{\alpha_1}+c_2\boldsymbol{\alpha_2}
$$

The three-dimensional input space has three linearly independent standard basis vectors $\boldsymbol{e_1},\boldsymbol{e_2},\boldsymbol{e_3}$.

Let’s apply $A$ to each of them. Each standard basis vector has a single $1$ and zeros everywhere else, so multiplying by it picks out a single column of $A$.

$$
\begin{aligned}
Ae_1&=\boldsymbol{\alpha_1}\\
Ae_2&=\boldsymbol{\alpha_2}\\
Ae_3&=\boldsymbol{\alpha_3}
\end{aligned}
$$

Here’s where things get interesting. After applying $A$, we can express $A\boldsymbol{e_3}$ as a linear combination of $\boldsymbol{\alpha_1}$ and $\boldsymbol{\alpha_2}$, which are $Ae_1$ and $Ae_2$!

That direction has lost its independence in the output.

In other words, **if a $3\times3$ matrix $A$ has rank $2$, the three independent directions in its input yield only two linearly independent directions in its output**.

Now let $v=e_3-c_1e_1-c_2e_2$. Then

$$
Av=A(e_3-c_1e_1-c_2e_2)=\boldsymbol{\alpha_3}-c_1\boldsymbol{\alpha_1}-c_2\boldsymbol{\alpha_2}=0
$$

So **$A$ sends some nonzero vector to zero**.

#### 2) Rank and Pivot Variables

Now we can explain why the rank equals the number of pivot variables.

Suppose $A$ is an $m\times n$ matrix with

$$
r(A)=r
$$

Its column space has a basis of $r$ linearly independent columns.

$$
a_{p_1},a_{p_2},\ldots,a_{p_r}
$$

Every output has a unique representation in this basis.

$$
AX=c_1a_{p_1}+\cdots+c_ra_{p_r}
$$

So when we specify an output $b$ in the column space, **the $r$ coefficients are uniquely determined**.

Now consider

$$
AX=x_1a_1+\cdots+x_na_n=b
$$

After labeling the basis columns and their variables first, we can write each of the remaining $n-r$ columns as a linear combination of the first $r$.

Collecting terms gives us

$$
\begin{aligned}
&(x_1+f_1(x_{r+1},\ldots,x_n))a_1\\
+{}&(x_2+f_2(x_{r+1},\ldots,x_n))a_2\\
&\qquad\vdots\\
+{}&(x_r+f_r(x_{r+1},\ldots,x_n))a_r=b
\end{aligned}
$$

Here, $f_1,\ldots,f_r$ are linear combinations of the free variables.

This gives us $r$ pivot variables, $x_1,x_2,\ldots,x_r$. The coefficient of each basis vector is fixed, so the free variables $x_{r+1},\ldots,x_n$ determine their values.

## Two. Homogeneous Systems of Linear Equations

Set every entry of the constant vector $b$ to zero and you get a **homogeneous system of linear equations**.

We write it as

$$
\boxed{AX=0}
$$

It has a curious property. **When $A$ has full column rank, the only solution is $X=0$.**

This is easy enough to see. We can write the equation as

$$
\alpha_1x_1+\alpha_2x_2+\cdots+\alpha_nx_n=0
$$

When $A$ has full column rank, its columns are linearly independent. By definition, the only way their linear combination can give zero is if every coefficient $x_i$ is zero.

### 1. A Basis for the Null Space

Always ending up with zero is pretty boring, right?

When $A$ lacks full column rank, the homogeneous system has **infinitely many solutions**.

In terms of linear dependence, the columns $(\alpha_1,\alpha_2,\ldots,\alpha_n)$ are linearly dependent. So there is a choice of coefficients, with at least one nonzero, such that

$$
\alpha_1x_1+\alpha_2x_2+\cdots+\alpha_nx_n=0
$$

All coefficient vectors that satisfy this equation make up the **null space**.

Following the same reasoning as before, if $r(A)=r$, we can rewrite the equation as

$$
\begin{aligned}
&(x_1+f_1(x_{r+1},\ldots,x_n))a_1\\
+{}&(x_2+f_2(x_{r+1},\ldots,x_n))a_2\\
&\qquad\vdots\\
+{}&(x_r+f_r(x_{r+1},\ldots,x_n))a_r=0
\end{aligned}
$$

Since these $r$ vectors are linearly independent, their coefficients must all be zero. That gives us

$$
\begin{aligned}
&x_1+f_1(x_{r+1},\ldots,x_n)=0\\
&x_2+f_2(x_{r+1},\ldots,x_n)=0\\
&\qquad\vdots\\
&x_r+f_r(x_{r+1},\ldots,x_n)=0
\end{aligned}
$$

Each of the $r$ pivot variables $x_1,x_2,\ldots,x_r$ can be expressed in terms of the $n-r$ free variables.

So we can write the vector $X$ as

$$
X=x_{r+1}\begin{pmatrix} a \\ b \\ \vdots \\ c \end{pmatrix}
  +x_{r+2}\begin{pmatrix} d \\ e \\ \vdots \\ f \end{pmatrix}+\cdots
$$

This is the general solution of the homogeneous system. The **set of linearly independent vectors** in this expression forms a **basis for the null space**.

This also gives us an important result.

$$
\boxed{\text{Number of vectors in a null-space basis}=n-r(A)}
$$

Does that look a little weird? Fair. It takes a special kind of nerd to derive a null-space basis this way 😰. As for why I explained it this way…

<del>I ran out of ways to force a segue from the previous section. (Ducks.)</del>

So let’s look at an actual example.

Consider the homogeneous system

$$
\begin{cases}
x_1+x_2+x_3=0\\
x_2+x_3=0
\end{cases}
$$

Simplifying gives us

$$
\begin{cases}
x_1=0\\
x_2=-x_3
\end{cases}
$$

Set the free variable $x_3=t$. Then

$$
X=\begin{pmatrix}0\\-t\\t\end{pmatrix}
=t\begin{pmatrix}0\\-1\\1\end{pmatrix}
$$

Here, $t$ can be any real number.

So a single vector generates all infinitely many solutions.

$$
\boxed{\xi_1=\begin{pmatrix}0\\-1\\1\end{pmatrix}}
$$

The set $\{\xi_1\}$ is a basis for the null space.

### 2. How Multiplying by Another Matrix Affects the Null Space

Suppose we have a system of linear equations

$$
AX=0
$$

We multiply on the left by another matrix $B$ to get

$$
BAX=0
$$

How does this affect the basis for the null space?

First, if $AX=0$, then of course

$$
BAX=B0=0
$$

Every solution of $AX=0$ is therefore a solution of $BAX=0$. In other words, the null space of $A$ is contained in the null space of $BA$.

$$
\boxed{\ker(A)\subseteq\ker(BA)}
$$

> $\ker(A)$ denotes the null space of $A$, the set of all solutions to $AX=0$, including the zero vector.

#### Equal Null Spaces

Something special happens when $r(BA)=r(A)$. The two null spaces are equal.

We can see this directly from the dimensions. If $r(BA)=r(A)$, then

$$
\dim\ker(BA)=n-r(BA)=n-r(A)=\dim\ker(A)
$$

> $\dim$ denotes dimension. The dimension $\dim\ker(A)$ is the number of vectors in a basis for the null space of $A$.

So a basis for either null space has exactly $n-r$ vectors. Since $\ker(A)\subseteq\ker(BA)$ and the dimensions are equal, the null spaces must be equal.

Is this just a lucky encounter between two theorems? We can also see what’s happening by looking at the transformations themselves.

The matrices act from right to left, so for $BAX$ we have

$$
X\xrightarrow{A}Y\xrightarrow{B}Z
$$

In other words, $A$ transforms $X$ into $Y$, and then $B$ transforms $Y$ into $Z$.

The equality $r(BA)=r(A)$ tells us that the number of independent directions surviving $A$ is the same as the number surviving both $A$ and $B$. The transformation $B$ preserves all the independent directions in the output of $A$.

That is, **$B$ is injective on the image of $A$**.

> Injectivity on the image of $A$ is all we need for $r(BA)=r(A)$, even if $B$ itself has linearly dependent columns.

## Three. Nonhomogeneous Systems of Linear Equations

What other kinds of linear systems are there besides homogeneous ones?

<del>All the other ones. (Ducks.)</del>

A nonhomogeneous system is one whose constant vector $b$ is nonzero. We write it as

$$
\boxed{AX=b}
$$

To determine whether a nonhomogeneous system has a solution, we usually compare the rank of its coefficient matrix with that of its augmented matrix.

Take this simple example.

$$
\begin{pmatrix}
\begin{array}{cc|c}
1 & 1 & 3\\
0 & 0 & 1
\end{array}
\end{pmatrix}
$$

We get $0+0=1$, so the system clearly has no solution. In other words, **if the coefficient matrix has lower rank than the augmented matrix, the system has no solution**.

### The General Solution of a Nonhomogeneous System

Nonhomogeneous systems have an interesting property. **The difference between any two particular solutions is a solution of the corresponding homogeneous system.**

Suppose the nonhomogeneous system has two distinct solutions $\eta_1$ and $\eta_2$. Then

$$
\begin{aligned}
A\eta_1-A\eta_2&=b-b \\
A(\eta_1-\eta_2)&=0
\end{aligned}
$$

Call the difference $\xi=\eta_1-\eta_2$. The equation becomes

$$
A\xi=0
$$

So $\xi$ is a solution of the homogeneous system.

Let’s take this a step further. Suppose $X$ is any solution of $AX=b$, and $\eta$ is a fixed particular solution. Then

$$
A(X-\eta)=0
$$

So $X-\eta$ is always a solution of the homogeneous system. Conversely, if $A\xi=0$, then $A(\eta+\xi)=b$.

It follows that **the general solution of the nonhomogeneous system is $X=\eta+\xi$, where $\eta$ is a particular solution and $\xi$ ranges over all solutions of the corresponding homogeneous system**.
