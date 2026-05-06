<template>
  <PageHero
    eyebrow="Join Us"
    title="加入我们"
    description="我们长期欢迎对深度学习、生物信息、药物发现、医学影像和蛋白质建模感兴趣的同学参与研究与系统建设。"
  />

  <section class="section">
    <div class="reason-grid">
      <article v-for="reason in joinReasons" :key="reason.title" class="reason-card">
        <h2>{{ reason.title }}</h2>
        <p>{{ reason.description }}</p>
      </article>
    </div>
  </section>

  <section class="section join-panel">
    <div>
      <p class="eyebrow">Research Assistant</p>
      <h2>长期招收研究助理</h2>
      <p>
        适合希望申请研究生或博士项目、愿意投入智能医学与生物计算研究的同学。你将参与数据处理、模型训练、论文复现、评测协议和系统原型建设。
      </p>
    </div>
    <div class="join-lists">
      <div>
        <h3>你会参与</h3>
        <ul>
          <li>整理蛋白质、药物分子、医学影像或舌象多模态数据</li>
          <li>复现生物计算与智能医学前沿论文并推进模型改进</li>
          <li>搭建蛋白生成、DTA 预测、医学图像分类等任务基线</li>
          <li>协助撰写论文、报告和项目文档</li>
        </ul>
      </div>
      <div>
        <h3>期待你具备</h3>
        <ul>
          <li>熟悉 Python，愿意学习深度学习框架</li>
          <li>对生物信息、药物发现、医学影像或多模态学习有兴趣</li>
          <li>能稳定投入时间，重视协作和复盘</li>
        </ul>
      </div>
    </div>
    <a class="button primary" :href="`mailto:${siteInfo.email}?subject=申请加入智能医学与生物计算实验室`">
      发送申请邮件
    </a>
  </section>
</template>

<script setup>
import PageHero from '../components/PageHero.vue'
import { joinReasons, siteInfo } from '../data/siteData'
</script>
