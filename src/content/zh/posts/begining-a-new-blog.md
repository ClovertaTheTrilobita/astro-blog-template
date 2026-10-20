---
title: "于是，我重新设计了博客"
pubDate: 2026-10-20
description: '100%由人类设计，99.99%由AI编写'
author: "三叶"
image: 
    url: "https://files.seeusercontent.com/2026/10/20/Od0m/pasted-image-1792458846174.webp"
    alt: "screenshot"
tags:  ["随笔"]
---

或许基础开发岗早就完蛋了。

昨天我用可画制作了7个新博客设计的效果图，随后突发奇想，如果我直接把效果图和架构设计文档丢给codex，能达到怎么样的效果呢？

结论就是，GPT6.1-sol用17分钟就完成了我过去需要熬夜一周的工作量。

<img src="https://files.seeusercontent.com/2026/10/20/u7dB/pasted-image-1792457995098.webp" alt="pasted-image-1792457995098.webp" title="pasted-image-1792457995098.webp" style="zoom:30%; display: block; margin: 0 auto;" >

我吃了顿饭的功夫它就自己做好了一个完成度高的吓人的网站，不仅各项要求都能正常实现，甚至还自己做好了多端适配。诡异的是，它的动画性能也比我之前的博客好很多。加上一些细节上的微调，前前后后也就花了两个小时就做好了初版的网站。

我感觉我才是它效率的瓶颈，就像是纸带打孔时期的电脑，CPU运行的时间其实很短，大量的时间被浪费在了人工IO上。

## 为什么会想重做一个博客

得益于我之前“直接写代码！”的蛮干精神，我之前的博客虽然说不上好看，但至少也是挺难看的。而且“能跑就行”的思想贯穿了整个项目，导致代码繁杂且混乱，修改一处地方可能要编辑三到四个文件。而我最近想给博客加一个全新的栏目，看了看原来的代码结构，想要加入这个栏目几乎得把半个项目都重构一遍，那还不如从头写一个网站呢。

不过最主要的原因还是不好看（

<img src="https://files.seeusercontent.com/2026/10/20/fW8z/pasted-image-1792463177063.webp" alt="pasted-image-1792463177063.webp" title="pasted-image-1792463177063.webp" style="zoom:16%; display: block; margin: 0 auto;" >

博客的主题来自我上个月看的一部轻小说，名叫<b>[《便·当》](https://zh.wikipedia.org/wiki/%E4%BE%BF%C2%B7%E7%95%B6)</b>。讲述一群人为了争夺半价的便当而发生的滑稽却热血的故事。故事中的“HP半价同好会”则是由一群半价便当爱好者自发组织的社团，这让我想起大一大二的时候，我们在社团准备竞赛，坐在机器边上一起吃晚餐的吵吵闹闹的时光。真是温馨。我很羡慕他们能有一个自己的精神归属。

于是我开始着手收集我想要放在博客装饰中的元素。设计的第一步，是头脑风暴。

<img src="https://files.seeusercontent.com/2026/10/20/Fl9u/pasted-image-1792459757598.webp" alt="pasted-image-1792459757598.webp" title="pasted-image-1792459757598.webp" style="zoom:16%;display: block; margin: 0 auto;" >

<p align="center"><sup>我找到的一些喜欢的风格碎片</sup></p>

我希望我的网站能带一点古早互联网的感觉，还想融入一些便利店的元素，这或许能增加几分亲切感。我喜欢罗森，试想在凌晨4点的时候肚子饿了，但此时没有一家餐厅开门，楼下能有家罗森是多么一件美事啊。

24h开门的罗森会永远带着它的关东煮和饭团在那里等你。

于是就有了这样的设计。

<img src="https://files.seeusercontent.com/2026/10/20/nK4r/pasted-image-1792460254442.webp" alt="pasted-image-1792460254442.webp" title="pasted-image-1792460254442.webp" style="zoom:16%; display: block; margin: 0 auto;" >

我的网站构想就是从这三块“蓝-红-蓝”的色块开始的。把它这么一拼接，便利店的生活感一下子就出来了。包括网站的[favicon](https://blog.cloverta.top/favicon.svg)其实更有内味。

<img src="https://files.seeusercontent.com/2026/10/20/Od0m/pasted-image-1792458846174.webp" alt="pasted-image-1792458846174.webp" title="pasted-image-1792458846174.webp" style="zoom:33%; display: block; margin: 0 auto;" >

<p align="center"><sup>看起来像是会随机生成在你家楼下的便利店</sup></p>

这个favicon的灵感来源其实来自GPT老师。它在帮我做完网站的框架之后随手捏了一个favicon（我的天呐G老师真是细致入微），大抵就是下面三个色块加上一些英文缩写，但毕竟是AI从头生成的配色和设计，乍一看有种说不出来的伪人味，当时就把它删掉了。

## 新添加的“栏目”

起因是我上周凌晨4点的时候饿的受不了了，跑到24h图书馆边上的一家罗森来物色盒饭。对于我的超级坏运气我还是有心知肚明的，如果随机选一个我有十足的把握会选到最难吃的那一个。于是我打开某书搜索“罗森盒饭推荐”，搜出来的相关结果却寥寥无几，唯一在正经评价的几个帖子中的盒饭也不在我这边卖。

凌晨跑来罗森买便当难道是什么很小众的做法吗？

没有人做那就由我来做！……什么的。抱持着这样子的一腔热血，我设计了“<b>[栏目](https://blog.cloverta.top/zh/series/)</b>”这一页面，在里面我会时不时地记录一些我看到的&吃到的，希望会有人喜欢。

在设计上它会比普通的博文短的多——与其说是博文，不如说是帖子——但是更新也会更加频繁，我为它添加了单独的<b>[RSS](https://blog.cloverta.top/zh/series/rss.xml)</b>，这样就能自由决定是否订阅这个（可能会）天天弹通知的栏目。

<img src="https://files.seeusercontent.com/2026/10/20/2Hto/pasted-image-1792462031605.webp" alt="pasted-image-1792462031605.webp" title="pasted-image-1792462031605.webp" style="zoom:16%; display: block; margin: 0 auto;" >

或许后面我还会放些其他的小栏目，还请敬请期待啦。

<img src="https://files.seeusercontent.com/2026/09/18/H6qn/100px-THBWiki-LOGO.gif" alt="uuz.png" title="uuz" style="display: block; margin: 0px auto; zoom: 67%;">