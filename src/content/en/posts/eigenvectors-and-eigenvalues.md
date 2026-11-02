---
title: "Vectors and Matrices in a Brutal Love Triangle—Eigenvalues λ and Eigenvectors x"
pubDate: 2026-11-3
description: '“I’ll have a plate of vectors smothered in rich matrix sauce, and a large glass of scalar multiplication.” “Oh, sir, that will kill quite a few brain cells.” “I know.”'
author: "Cloverta"
image: 
    url: "https://files.seeusercontent.com/2026/11/02/3dWq/image-8.webp"
    alt: "ln"
tags: ["Study Notes", "Linear Algebra"]
---

<p style="font-size: 0.85rem;"><i><sub>Content translated by <a href="https://chatgpt.com/">ChatGPT</a>.</sub></i></p>

What is a matrix?

A bunch of numbers arranged in a rectangular table.

What is a vector?

A pile of numbers lined up in a list.

By definition, to multiply two matrices $A$ and $B$, we take the dot product of each row of $A$ with each column of $B$. In other words,
$$
AB = \begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\begin{pmatrix}
e & f \\
g & h
\end{pmatrix}
=
\begin{pmatrix}
ae + bg & af + bh \\
ce + dg & cf + dh
\end{pmatrix}
$$
For a matrix multiplied by a vector, this becomes
$$
Ax = \begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\begin{pmatrix}
e  \\
f 
\end{pmatrix}
=
\begin{pmatrix}
ae + bf \\
ce + df 
\end{pmatrix}
$$
It is that simple.

But at what cost?

## Zero: The Geometry Behind Matrix Multiplication{#matrix-geometry}

We know that in two-dimensional space, **any nonzero vector can be expressed as a linear combination of two linearly independent vectors**. These two linearly independent vectors are called **basis vectors**.

> Linearly independent: neither vector can be expressed as a scalar multiple of the other.
>
> In other words, for vectors $x=\begin{pmatrix}a \\ b \end{pmatrix}$ and $y=\begin{pmatrix}c \\ d \end{pmatrix}$, if $x$ and $y$ are linearly independent, then $kx \ne y$ for every constant $k$.

For example, the vector $y=\begin{pmatrix}2 \\ 3 \end{pmatrix}$ can be expressed using $e_1=\begin{pmatrix}1 \\ 0 \end{pmatrix}$ and $e_2=\begin{pmatrix}0 \\ 1 \end{pmatrix}$ as $y=2e_1+3e_2$. This is our familiar Cartesian coordinate system.

Now suppose a matrix $P=\begin{pmatrix}1 & -1 \\ 1 & 1 \end{pmatrix}$ suddenly barges in. What happens if we multiply $y$ by it? Working through the calculation gives us
$$
Py=\begin{pmatrix}1 & -1 \\ 1 & 1 \end{pmatrix}\begin{pmatrix}2 \\ 3 \end{pmatrix}=
\begin{pmatrix}
1\times2 -1\times3 \\
1\times2 + 1\times3
\end{pmatrix}
=
\begin{pmatrix}-1 \\ 5 \end{pmatrix}
$$
We can view $P$ as two two-dimensional column vectors placed side by side: $P=(p_1, p_2)$, where $p_1=\begin{pmatrix}1 \\ 1 \end{pmatrix}$ and $p_2=\begin{pmatrix}-1 \\ 1 \end{pmatrix}$.

The expression above can therefore be read as
$$
Py=(p_1, p_2)\begin{pmatrix}2 \\ 3 \end{pmatrix}=2p_1+3p_2
$$
Look familiar? Exactly! We have built a vector using $p_1$ and $p_2$ as the basis vectors, with the same coefficients as before. Multiplying $y$ by $P$ replaces the basis vectors $e_1$ and $e_2$ with $p_1$ and $p_2$ while keeping those coefficients.

<div class="linear-basis-embed">
  <iframe
    src="/demos/linear-basis.html"
    title="Linear Transformation Visualization"
    loading="lazy"
  ></iframe>
</div>

<style>
  .linear-basis-embed {
    width: 100%;
    margin: 0 auto;
    padding: 0;
    container-type: inline-size;
  }

  .linear-basis-embed iframe {
    display: block;
    width: 100%;
    height: calc(56.667cqw + 40px);
    margin: 0;
    padding: 0;
    border: none;
  }

  @container (max-width: 540px) {
    .linear-basis-embed iframe {
      height: calc(80cqw + 40px);
    }
  }
</style>


## One: A Matrix and That Special Someone

Back to the topic. Generally, when a matrix acts on vectors<sub>a.k.a. when we multiply them on the left by a matrix, replacing their basis vectors</sub>, most of them will <ruby>change direction<rt>have a change of heart</rt></ruby>. What a bunch of fickle creatures!

But one kind of vector is different. When the matrix acts on it, it stays along the same line, merely stretching, shrinking, or reversing direction.

She is different. She is special.

We call these vectors the matrix's **eigenvectors**. For example, consider the matrix multiplication
$$
Ax_1=\begin{pmatrix}3 & -1 \\ 0 & 2 \end{pmatrix}\begin{pmatrix}1 \\ 0 \end{pmatrix}=
\begin{pmatrix}3 \\ 0 \end{pmatrix}
$$
After $A$ acts on it, the vector $x_1$ simply stretches to three times its original length along the same direction. This makes $x_1$ an **eigenvector** of $A$. We denote its scale factor by $\lambda_1$ and call it an **eigenvalue** of the matrix. Thus,
$$
Ax_1=\lambda_1x_1
$$
And this is the root of all evil.

More generally, every eigenvector $x_n$ of $A$ satisfies
$$
Ax=\lambda x
$$
where $\lambda$ is the corresponding eigenvalue.

<div class="eigenvectors-embed">
  <iframe
    src="/demos/eigenvectors.html"
    title="Eigenvector Visualization"
    loading="lazy"
  ></iframe>
</div>

<style>
  .eigenvectors-embed {
    width: 100%;
    margin: 0 auto;
    padding: 0;
    container-type: inline-size;
  }

  .eigenvectors-embed iframe {
    display: block;
    width: 100%;
    height: calc(56.667cqw + 40px);
    border: 0;
    margin: 0;
    padding: 0;
  }

  @container (max-width: 540px) {
    .eigenvectors-embed iframe {
      height: calc(80cqw + 40px);
    }
  }
</style>

Now comes the question: given a matrix, how do we find its eigenvectors?

### 1. Finding a Matrix's Eigenvectors and Eigenvalues

From the definition, we know that
$$
Ax=\lambda x \ (x \ne 0)
$$
Rearranging gives us
$$
Ax-\lambda x=0
$$
Factoring out $x$ gives
$$
(A-\lambda E)x=0
$$
Nothing suspicious yet? With our astonishing powers of observation, we notice an $n\times n$ matrix multiplying an $n\times1$ vector on the left-hand side. Let us write out what this looks like in two dimensions:
$$
\begin{pmatrix}a & b \\ c & d \end{pmatrix}\begin{pmatrix}x_1 \\ x_2 \end{pmatrix}=0
$$
Multiplying gives us
$$
\begin{pmatrix}ax_1+bx_2 \\ cx_1+dx_2 \end{pmatrix}=0
$$
We know that a matrix being $0$ means every entry is $0$, so we have
$$
\begin{cases}
a x_1 + b x_2 = 0 \\ \\
c x_1 + d x_2 = 0
\end{cases}
$$
What? It was a **homogeneous system of linear equations** all along?!

We know that, for this square homogeneous system, if all the equations are **linearly independent**, the only solution is the zero solution. But we have one crucial condition: $(x \ne 0)$.

For a nonzero solution to exist, the equations must therefore be **linearly dependent**. This means the determinant of the coefficient matrix must be zero:
$$
\begin{vmatrix}
a & b \\
c & d
\end{vmatrix}
= 0
$$

<details>
  <summary>Why?</summary>

> We need one equation to be expressible in terms of the other. In this two-equation system, that means the coefficients of one equation are all the same scalar multiple of the corresponding coefficients of the other.
>
> Extracting the coefficients gives us the matrix
>
>
> $$
>\begin{pmatrix}a & b \\ c & d \end{pmatrix}
> $$
> Suppose $a$ and $b$ are $k$ times $c$ and $d$, respectively. Then the determinant of this square matrix is
> $$
> \begin{vmatrix}
> a & b \\
> c & d
> \end{vmatrix}
> = 
> \begin{vmatrix}
> kc & kd \\
> c & d
> \end{vmatrix}
> =
> k\begin{vmatrix}
> c & d \\
> c & d
> \end{vmatrix}
> $$
> We know that a determinant with two identical rows or columns is zero.
> 
> Therefore,
> $$
>\begin{vmatrix}
> a & b \\
> c & d
> \end{vmatrix}
> = 0
> $$

</details>

Returning to our original expression, the goal is now clear. We want
$$
\begin{vmatrix}A-\lambda E
\end{vmatrix}=0
$$
This lets us solve for $\lambda$.

For a simple example, suppose $A=\begin{pmatrix}3 & -1 \\ -1 & 3 \end{pmatrix}$. Then
$$
\begin{vmatrix}A-\lambda E
\end{vmatrix}
=
\begin{vmatrix}3-\lambda & -1 \\ -1 & 3-\lambda \end{vmatrix}
=
(3-\lambda)^2-1 = (\lambda-2)(\lambda-4)
$$
We can then find the two eigenvalues of $A$: $\lambda_1=2,\ \lambda_2=4$.

Now we know that $A$ has two distinct eigenvalues, with two corresponding families of eigenvectors. Note that, in this example, the vectors within each family are scalar multiples of one another.

Next, substitute $\lambda_1=2$ into the original equation:
$$
(A-2E)x=0
$$
After row reduction, this becomes
$$
\begin{pmatrix}1 & -1 \\ 0 & 0 \end{pmatrix}\begin{pmatrix}x_1 \\ x_2 \end{pmatrix}=0
$$
We obtain
$$
x_1-x_2=0
$$
Let $x_1=k_1$. Then the vector is $x=k_1\begin{pmatrix}1 \\ 1 \end{pmatrix}$.

Similarly, when $\lambda_2=4$, we obtain $x=k_2\begin{pmatrix}-1 \\ 1 \end{pmatrix}$.

### 2. Diagonalizing a Matrix (A Major Matrix Makeover?!)

Suppose we have a $3\times3$ matrix $A$ with three eigenvectors $x_1, \ x_2, \ x_3$. Time for some super assembly: combine the three eigenvectors into one matrix!
$$
P=\begin{pmatrix}x_1,x_2,x_3\end{pmatrix}
$$
Multiply $P$ on the left by $A$:
$$
AP=(Ax_1, Ax_2, Ax_3)
$$
Recall that when $A$ multiplies one of its eigenvectors, we have $Ax-\lambda x=0$. Therefore,
$$
\begin{align*}
AP &= (Ax_1, Ax_2, Ax_3) \\
   &= (\lambda_1 x_1,\ \lambda_2 x_2,\ \lambda_3 x_3) \\
   &= \begin{pmatrix} x_1, x_2, x_3 \end{pmatrix}
      \begin{pmatrix}
        \lambda_1 & 0 & 0 \\
        0 & \lambda_2 & 0 \\
        0 & 0 & \lambda_3
      \end{pmatrix} \\
   &= P\begin{pmatrix}
        \lambda_1 & 0 & 0 \\
        0 & \lambda_2 & 0 \\
        0 & 0 & \lambda_3
      \end{pmatrix} \\
\end{align*}
$$
Pretty magical, right? We get a diagonal matrix whose diagonal entries are the eigenvalues. We denote it by $\Lambda$; it is a **diagonal matrix similar to $A$**. Thus,
$$
AP = P\Lambda
$$
Multiplying both sides on the left by $P^{-1}$ gives us
$$
\begin{align*}
P^{-1}AP &=P^{-1}P\Lambda = \Lambda
\end{align*}
$$

> **Similar matrices**:
>
> By definition, if there exists an invertible matrix $P$ such that $P^{-1}AP=B$, then $B$ is similar to $A$.
>
> From <b>[The Geometry Behind Matrix Multiplication](#matrix-geometry)</b>, we can see what similarity means geometrically: <b>the two matrices describe the same linear transformation using different coordinate systems (bases)</b>.
>
> We can break the transformation $y=Bx$ into a sequence of steps.
>
> ```mermaid
> flowchart LR
>     A["Coordinates in the new basis: x"]
>     B["Coordinates in the original basis: Px"]
>     C["Transformed coordinates in the original basis: APx"]
>     D["Transformed coordinates in the new basis: P⁻¹APx"]
> 
>     A -->|P| B
>     B -->|A| C
>     C -->|P⁻¹| D
> 
>     classDef rose fill:#C98986,stroke:#C98986,color:black;
>     classDef blue fill:#82A7A6,stroke:#82A7A6,color:black
>     classDef taupe fill:#785964,stroke:#785964,color:white
>     classDef note fill:#F4F4F4,stroke:#F4F4F4,color:black
>     classDef beaver fill:#9A8873,stroke:#9A8873,color:white
>     classDef silver fill:#C4BBB8, stroke:#C4BBB8
>     classDef cadet fill:#39375B,stroke:#39375B,color:white
> 
>     class A blue;
>     class B silver;
>     class C silver;
>     class D taupe;
> 
>     linkStyle 0 stroke:#82A7A6,stroke-width:2px,color:#82A7A6
>     linkStyle 1 stroke:#C4BBB8,stroke-width:2px,color:#C4BBB8
>     linkStyle 2 stroke:#785964,stroke-width:2px,color:#785964
> ```
>
> The formula can therefore be broken down as follows:
> $$
> \underbrace{B}_{\text{Matrix in the new basis}} = \underbrace{P^{-1}}_{\text{Back to the new basis}} \underbrace{A}_{\text{Apply the transformation}} \underbrace{P}_{\text{To the original basis}}
> $$

### 3. The Trace of a Matrix

The trace of a matrix is simple: add up all the entries on the main diagonal of a square matrix. For example, for $A=\begin{pmatrix}a & b \\ c & d \end{pmatrix}$, its trace is
$$
tr(A)=a+d
$$
If $A$ is similar to a diagonal matrix $\Lambda$, then $tr(A)$ equals $tr(\Lambda)$: the sum of all the eigenvalues.

Here is a quick proof:
$$
A=P\Lambda P^{-1}
$$
Then
$$
\begin{align*}
tr(A)&=tr(P\Lambda P^{-1}) \\
&= tr(\Lambda PP^{-1}) \\
&= tr(\Lambda)
\end{align*}
$$

<details>
  <summary>Why?</summary>

> Let us prove it using two $2\times2$ matrices:
>$$
>A=\begin{pmatrix}a&b\\c&d\end{pmatrix},
>\quad
>B=\begin{pmatrix}e&f\\g&h\end{pmatrix}
>$$
> First, calculate $AB$:
>$$
> AB=\begin{pmatrix}
> ae+bg&af+bh\\
> ce+dg&cf+dh
> \end{pmatrix}
> $$
> 
> So,
>$$
> \operatorname{tr}(AB)=ae+bg+cf+dh
> $$
> 
> Next, calculate $BA$:
>$$
> BA=\begin{pmatrix}
> ea+fc&eb+fd\\
> ga+hc&gb+hd
> \end{pmatrix}
> $$
> 
> So,
>$$
> \operatorname{tr}(BA)=ea+fc+gb+hd
> $$
> 
> Since multiplication of ordinary numbers is commutative,
>$$
> ae=ea,\quad bg=gb,\quad cf=fc,\quad dh=hd
> $$
> 
> Therefore,
>$$
> \boxed{\operatorname{tr}(AB)=\operatorname{tr}(BA)}
> $$
> 
> This result holds for any two square matrices of the same size.

</details>

### 4. Eigenvalues of Related Matrices

Suppose we know the eigenvalues of $A$.

##### 1. The eigenvalues of $aA+bE$ are $a\lambda+b$

Here is a quick proof:
$$
\begin{align*}
(aA+bE)x &= aAx+bEx\\
&= a\lambda x+bx\\
&=(a\lambda+b)x
\end{align*}
$$

##### 2. The eigenvalues of $A^n$ are $\lambda^n$

$$
\begin{align*}
A^nx&=A^{n-1}Ax\\
&=A^{n-1}\lambda x\\
&=A^{n-2}\lambda^2x\\
&...\\
&=\lambda^nx
\end{align*}
$$

##### 3. The eigenvalues of $A^{-1}$ are $\lambda^{-1}$

Since
$$
AA^{-1}=E
$$
We obtain
$$
\begin{align*}
A^{-1}Ax&=x\\
A^{-1}\lambda x&=x\\
A^{-1}x&=\lambda^{-1}x
\end{align*}
$$

##### 4. The eigenvalues of the adjugate $A^*$ are $\frac{|A|}{\lambda}$

Since
$$
\begin{align*}
A^*A=|A|E
\end{align*}
$$
Therefore,
$$
\begin{align*}
A^*Ax&=|A|x\\
A^*\lambda x&=|A|x\\
A^*x&=\frac{|A|}{\lambda}x
\end{align*}
$$

##### 5. The eigenvalues of $A^T$ are still $\lambda$

We start from the characteristic equation
$$
|A-\lambda E|=0
$$
And since
$$
A^T-\lambda E=A^T-\lambda E^T=(A-\lambda E)^T
$$
it follows that
$$
|A^T-\lambda E|=|(A-\lambda E)^T|=|A-\lambda E|
$$
The two matrices have exactly the same characteristic equation, so naturally they have the same eigenvalues.
