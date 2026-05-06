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

  <section class="section join-detail-grid">
    <article class="mini-panel">
      <p class="eyebrow">Open Roles</p>
      <h2>开放类型</h2>
      <ul class="check-list">
        <li>长期研究助理：适合准备申请研究生、博士或科研岗位的同学</li>
        <li>学生科研：适合本科生、硕士生从复现、数据整理和基线搭建开始</li>
        <li>合作项目：欢迎医学、生物、药学和计算方向的交叉合作</li>
      </ul>
    </article>

    <article class="mini-panel">
      <p class="eyebrow">Materials</p>
      <h2>申请材料</h2>
      <ul class="check-list">
        <li>简历或个人介绍，说明教育背景、技能栈和可投入时间</li>
        <li>一段最感兴趣的研究方向，以及为什么想参与</li>
        <li>可选：论文复现、课程项目、代码仓库或科研经历链接</li>
      </ul>
    </article>

    <article class="mini-panel">
      <p class="eyebrow">Commitment</p>
      <h2>投入建议</h2>
      <ul class="check-list">
        <li>建议至少连续投入 3 个月以上，便于完成一个可复盘的小任务</li>
        <li>每周稳定同步进展，重视实验记录、代码可复现和阶段总结</li>
        <li>医学相关演示和数据处理需遵守科研伦理和数据合规要求</li>
      </ul>
    </article>
  </section>
</template>

<script setup>
import PageHero from '../components/PageHero.vue'
import { joinReasons, siteInfo } from '../data/siteData'
</script>
