<template>
  <div class="help-center">
    <h1>Help Center</h1>
    <div class="faq-section">
      <h2>Frequently Asked Questions</h2>
      <ul>
        <li>
          <h3>问题 1</h3>
          <p>问题 1 的答案。</p>
        </li>
        <li>
          <h3>问题 2</h3>
          <p>问题 2 的答案。</p>
        </li>
        <!-- 根据需要添加更多问题和答案 -->
      </ul>
    </div>
    <div class="contact-section">
      <h2>联系我们</h2>
      <p>
        如果您有其他问题，请通过
        <a href="mailto:support@example.com">support@example.com</a> 联系我们。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelperCenterPage',
};
</script>

<style scoped>
.help-center {
  padding: 20px;
}

.faq-section,
.contact-section {
  margin-bottom: 20px;
}

h1,
h2,
h3 {
  color: #333;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
