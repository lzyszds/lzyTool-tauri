<!-- <script setup lang='ts'>
import axios from "axios";


const apiKey = "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";
const prompt = "使用js怎么发送请求";
const model = "text-davinci-002";
const temperature = 1;
const maxTokens = 4000;
const gpt = () => {
  axios.post('https://api.openai.com/v1/completions', {
    prompt,
    model,
    temperature,
    max_tokens: maxTokens
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  })
    .then(response => {
      console.log(response.data.choices[0].text);
    })
    .catch(error => {
      console.error(error);
    });
}
</script>

<template>
  <div>

  </div>
</template>

<style lang='scss' scoped>
</style> -->
