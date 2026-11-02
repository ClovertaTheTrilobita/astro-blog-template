---
title: "向量和矩阵的惨烈修罗场——矩阵的特征值λ与特征向量x"
pubDate: 2026-11-3
description: '“我要一盘向量，浇上浓浓的矩阵，再来一大杯数乘。”“哦先生，这得杀死不少脑细胞。”“我知道。”'
author: "三叶"
image: 
    url: "https://files.seeusercontent.com/2026/11/02/3dWq/image-8.webp"
    alt: "ln"
tags:  ["学习笔记", "线性代数"]
---

什么是矩阵？

一群数组成的四边形表格。

什么是向量？

一坨数排成的列表。

我们规定了，矩阵乘法中，对于两个矩阵$AB$，我们用$A$的每一行乘上$B$的每一列，也就是说
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
那么对于矩阵乘向量来说，就是
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
就是这么简单。

那么，代价是什么呢？

## 零、矩阵乘法背后的几何意义{#matrix-geometry}

我们知道，在二维空间中，**任何一个非零向量可以由两个线性无关的向量表示**。这两个线性不相关的向量被称为**基向量**。

> 线性无关：两个向量没法互相表示。
>
> 换言之，向量$x=\begin{pmatrix}a \\ b \end{pmatrix}$，向量$y=\begin{pmatrix}c \\ d \end{pmatrix}$，如果$x$与$y$线性无关，则对任意常数$k$，$kx \ne y$。

举例来讲，对于向量$y=\begin{pmatrix}2 \\ 3 \end{pmatrix}$，可以由$e_1=\begin{pmatrix}1 \\ 0 \end{pmatrix}$，$e_2=\begin{pmatrix}0 \\ 1 \end{pmatrix}$表示，即$y=2e_1+3e_2$。这也是我们常见的直角坐标系。

假如此时乱入了一个矩阵$P=\begin{pmatrix}1 & -1 \\ 1 & 1 \end{pmatrix}$，用它来乘$y$，结果是什么呢？通过数学计算，我们可以得到
$$
Py=\begin{pmatrix}1 & -1 \\ 1 & 1 \end{pmatrix}\begin{pmatrix}2 \\ 3 \end{pmatrix}=
\begin{pmatrix}
1\times2 -1\times3 \\
1\times2 + 1\times3
\end{pmatrix}
=
\begin{pmatrix}-1 \\ 5 \end{pmatrix}
$$
我们可以将矩阵$P$视为由两个二维列向量组成，即$P=(p_1, p_2)$，其中$p_1=\begin{pmatrix}1 \\ 1 \end{pmatrix}$，$p_2=\begin{pmatrix}-1 \\ 1 \end{pmatrix}$。

则上式可以被看为
$$
Py=(p_1, p_2)\begin{pmatrix}2 \\ 3 \end{pmatrix}=2p_1+3p_2
$$
觉得眼熟？没错！这刚好是以$p_1$和$p_2$为基，以相同的倍数构建成的向量。通过将矩阵$P$乘向量$y$，我们把$y$的基向量由$e_1$和$e_2$换成了$p_1$、$p_2$。

<div class="linear-basis-embed">
  <iframe
    src="/demos/linear-basis.html"
    title="线性变换可视化"
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


## 一、矩阵，和特别的它

回归正题，一般来讲，当一个矩阵作用于向量时<sub>a.k.a.被矩阵左乘，改变向量的基时</sub>，这些向量大多都会<ruby>改变方向<rt>变心</rt></ruby>，真是虚伪的家伙们！

但有一类向量，它不一样，在被矩阵作用时，并不被改变方向，而是沿着原有的方向伸缩/反向。

她不一样，她是特别的。

我们称这类向量为矩阵的**特征向量**。例如，对于矩阵乘法
$$
Ax_1=\begin{pmatrix}3 & -1 \\ 0 & 2 \end{pmatrix}\begin{pmatrix}1 \\ 0 \end{pmatrix}=
\begin{pmatrix}3 \\ 0 \end{pmatrix}
$$
我们发现经过矩阵$A$的作用后，向量$x_1$仅仅沿原方向延长为3倍。那么，$x_1$便是矩阵$A$的一个**特征向量**。而向量变化的倍率可以记为$\lambda_1$，称为矩阵的一个**特征值**。那么就有：
$$
Ax_1=\lambda_1x_1
$$
这便是万恶的起源。

更通用地，对于$A$的所有特征向量$x_n$，我们都可以通过
$$
Ax=\lambda x
$$
来表示。 

<div class="eigenvectors-embed">
  <iframe
    src="/demos/eigenvectors.html"
    title="特征向量可视化"
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

那么问题来了，我们怎么通过一个已知的矩阵，求得它的特征向量呢？

### 1. 求矩阵的特征向量/特征值

根据定义我们知道
$$
Ax=\lambda x \ (x \ne 0)
$$
我们可以将其移位，获得
$$
Ax-\lambda x=0
$$
将$x$分离出来
$$
(A-\lambda E)x=0
$$
似乎没看出什么蹊跷？发动惊人的注意力，我们发现，左边是一个$n\times n$的矩阵，而右边是一个$n\times1$的向量。我们将它恢复到它本来的面貌，也就是
$$
\begin{pmatrix}a & b \\ c & d \end{pmatrix}\begin{pmatrix}x_1 \\ x_2 \end{pmatrix}=0
$$
计算后有
$$
\begin{pmatrix}ax_1+bx_2 \\ cx_1+dx_2 \end{pmatrix}=0
$$
我们知道，矩阵为$0$意味着该矩阵中的每一项都是$0$，于是乎就有
$$
\begin{cases}
a x_1 + b x_2 = 0 \\ \\
c x_1 + d x_2 = 0
\end{cases}
$$
什么？它原来是一个**齐次线性方程组**？！

我们知道，在齐次线性方程组中，如果所有的式子均**线性无关**，则该方程组只有唯一$0$解。但是我们有一个大前提：$(x \ne 0)$。

也就是说，要使式子有非零解，方程组的式子必须**线性相关**。也就是说它系数组成的行列式必须为0。即
$$
\begin{vmatrix}
a & b \\
c & d
\end{vmatrix}
= 0
$$

<details>
  <summary>为什么？</summary>

> 我们需要其中的某一个式子能够表达其它的式子。也就是说，方程组中某个式子的系数均为另外某一个式子系数的倍数。
>
>我们将系数提取出来，恢复为矩阵
>
>
> $$
>\begin{pmatrix}a & b \\ c & d \end{pmatrix}
> $$
> 如果a和b是c和d的倍数的话，这意味着，假设a、b分别为c、d的k倍，那这个方阵的行列式为
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
> 我们知道，行列式中出现相同的两行/列时，行列式的值为0。
> 
> 那么就有
> $$
>\begin{vmatrix}
> a & b \\
> c & d
> \end{vmatrix}
> = 0
> $$

</details>

代回到原式，我们的目标就很明确了，我们希望
$$
\begin{vmatrix}A-\lambda E
\end{vmatrix}=0
$$
这样子就能求出$\lambda$了。

举个简单的例子，假设$A=\begin{pmatrix}3 & -1 \\ -1 & 3 \end{pmatrix}$，那么
$$
\begin{vmatrix}A-\lambda E
\end{vmatrix}
=
\begin{vmatrix}3-\lambda & -1 \\ -1 & 3-\lambda \end{vmatrix}
=
(3-\lambda)^2-1 = (\lambda-2)(\lambda-4)
$$
就可以求出$A$的两个特征值为$\lambda_1=2,\ \lambda_2=4$。

现在我们知道了，$A$有两个特征值，那么它必然有两组对应的特征向量。注意每一组中的向量互相线性相关。

随后就可以把$\lambda_1=2$代回原式
$$
(A-2E)x=0
$$
也就是
$$
\begin{pmatrix}1 & -1 \\ 0 & 0 \end{pmatrix}\begin{pmatrix}x_1 \\ x_2 \end{pmatrix}=0
$$
有
$$
x_1-x_2=0
$$
令$x_1=k_1$，那么向量$x=k_1\begin{pmatrix}1 \\ 1 \end{pmatrix}$

同理当$\lambda_2=4$时，有$x=k_2\begin{pmatrix}-1 \\ 1 \end{pmatrix}$

### 2. 矩阵的对角化（矩阵迎来大变？！）

假设现在我们手上有一个三阶矩阵$A$。它有三个特征向量分别为$x_1, \ x_2, \ x_3$，现在我们进行超级拼装，将三个特征向量合为一个矩阵
$$
P=\begin{pmatrix}x_1,x_2,x_3\end{pmatrix}
$$
用$A$左乘$P$
$$
AP=(Ax_1, Ax_2, Ax_3)
$$
注意到，当$A$乘上它的特征向量时，有公式$Ax-\lambda x=0$，所以
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
很神奇吧？这样我们就能得到一个完全由特征值组成的对角阵，我们将其记为$\Lambda$，这便是$A$的**相似对角矩阵**。也就有
$$
AP = P\Lambda
$$
那么等式两端同时左乘$P^{-1}$，就有
$$
\begin{align*}
P^{-1}AP &=P^{-1}P\Lambda = \Lambda
\end{align*}
$$

> **相似矩阵**：
>
> 从定义上来讲，如果存在可逆矩阵$P$，那么经过变换$P^{-1}AP=B$，得到的$B$就是$A$的相似矩阵。
>
> 但由<b>[矩阵乘法背后的几何意义](#matrix-geometry)</b>这一节我们能想到，矩阵相似本质上就是<b>两个矩阵描述的是同一个线性变换，只不过使用了不同的坐标系（基）</b>。
>
> 我们可以把变换$y=Bx$拆分成一个工作流。
>
> ```mermaid
> flowchart LR
>     A["新基下坐标 x"]
>     B["原基下坐标 Px"]
>     C["变换后的原坐标 APx"]
>     D["变换后的新坐标 P⁻¹APx"]
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
> 那么公式可以被拆解为：
> $$
> \underbrace{B}_{\text{新基下的矩阵}} = \underbrace{P^{-1}}_{\text{换回新基}} \underbrace{A}_{\text{执行变换}} \underbrace{P}_{\text{换成原基}}
> $$

### 3. 矩阵的迹

矩阵的迹其实很简单，就是方阵对角线上的所有元素相加。例如，对于$A=\begin{pmatrix}a & b \\ c & d \end{pmatrix}$，它的迹就是
$$
tr(A)=a+d
$$
如果$A$有相似对角矩阵的话，$tr(A)$其实等于$tr(\Lambda)$，也就是所有特征值相加。

简单证明一下：
$$
A=P\Lambda P^{-1}
$$
于是
$$
\begin{align*}
tr(A)&=tr(P\Lambda P^{-1}) \\
&= tr(\Lambda PP^{-1}) \\
&= tr(\Lambda)
\end{align*}
$$

<details>
  <summary>为什么？</summary>

>我们用两个二阶矩阵证明：
>$$
>A=\begin{pmatrix}a&b\\c&d\end{pmatrix},
>\quad
>B=\begin{pmatrix}e&f\\g&h\end{pmatrix}
>$$
>先算 \(AB\)：
>$$
> AB=\begin{pmatrix}
> ae+bg&af+bh\\
> ce+dg&cf+dh
> \end{pmatrix}
> $$
> 
> 所以：
>$$
> \operatorname{tr}(AB)=ae+bg+cf+dh
> $$
> 
> 再算 \(BA\)：
>$$
> BA=\begin{pmatrix}
> ea+fc&eb+fd\\
> ga+hc&gb+hd
> \end{pmatrix}
> $$
> 
> 所以：
>$$
> \operatorname{tr}(BA)=ea+fc+gb+hd
> $$
> 
> 由于普通数的乘法满足交换律：
>$$
> ae=ea,\quad bg=gb,\quad cf=fc,\quad dh=hd
> $$
> 
> 因此：
>$$
> \boxed{\operatorname{tr}(AB)=\operatorname{tr}(BA)}
> $$
> 
> 这个结论对任意阶数相同的方阵都成立。

</details>

### 4. 相关矩阵的一些特征值

假设矩阵$A$的特征值已知。

##### 1. 对于矩阵$aA+bE$来说，它的特征值就是$a\lambda+b$。

简单证明一下
$$
\begin{align*}
(aA+bE)x &= aAx+bEx\\
&= a\lambda x+bx\\
&=(a\lambda+b)x
\end{align*}
$$

##### 2. $A^n$的特征值就是$\lambda^n$

$$
\begin{align*}
A^nx&=A^{n-1}Ax\\
&=A^{n-1}\lambda x\\
&=A^{n-2}\lambda^2x\\
&...\\
&=\lambda^nx
\end{align*}
$$

##### 3. $A^{-1}$的特征值为$\lambda^{-1}$

因为
$$
AA^{-1}=E
$$
有
$$
\begin{align*}
A^{-1}Ax&=x\\
A^{-1}\lambda x&=x\\
A^{-1}x&=\lambda^{-1}x
\end{align*}
$$

##### 4. $A^*$的特征值是$\frac{|A|}{\lambda}$

因为
$$
\begin{align*}
A^*A=|A|E
\end{align*}
$$
所以
$$
\begin{align*}
A^*Ax&=|A|x\\
A^*\lambda x&=|A|x\\
A^*x&=\frac{|A|}{\lambda}x
\end{align*}
$$

##### 5. $A^T$的特征值还是$\lambda$

我们规定了
$$
|A-\lambda E|=0
$$
而
$$
A^T-\lambda E=A^T-\lambda E^T=(A-\lambda E)^T
$$
于是：
$$
|A^T-\lambda E|=|(A-\lambda E)^T|=|A-\lambda E|
$$
这说明两者的特征方程完全相同，所以解出来的特征值自然相同。
