<template>
  <PageHero
    eyebrow="Join Us"
    title="加入我们"
    description="我们长期欢迎对医学 AI、临床数据智能和平台工程感兴趣的同学参与研究与系统建设。"
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
        适合希望申请研究生或博士项目、愿意投入医学人工智能研究的同学。你将参与数据处理、模型训练、论文复现、系统开发与成果整理。
      </p>
    </div>
    <div class="join-lists">
      <div>
        <h3>你会参与</h3>
        <ul>
          <li>整理医疗数据、构建实验任务和评测协议</li>
          <li>复现医学 AI 前沿论文并推进模型改进</li>
          <li>开发临床辅助决策或科研自动化原型</li>
          <li>协助撰写论文、报告和项目文档</li>
        </ul>
      </div>
      <div>
        <h3>期待你具备</h3>
        <ul>
          <li>熟悉 Python，愿意学习深度学习框架</li>
          <li>对医学、数据科学或自然语言处理有兴趣</li>
          <li>能稳定投入时间，重视协作和复盘</li>
        </ul>
      </div>
    </div>
    <a class="button primary" :href="`mailto:${siteInfo.email}?subject=申请加入医智矩阵实验室`">
      发送申请邮件
    </a>
  </section>
</template>

<script setup>
import PageHero from '../components/PageHero.vue'
import { joinReasons, siteInfo } from '../data/siteData'
</script>
