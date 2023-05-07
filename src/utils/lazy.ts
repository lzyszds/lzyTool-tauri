/* 图片懒加载 */
import loadGif from '../assets/images/loading.gif'
export default {
  mounted(el, binding) {
    const elImg = el.src
    el.src = loadGif
    const observe = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0]
      if (isIntersecting == true) {
        // setTimeout(() => {
        el.src = elImg
        observe.unobserve(el)
        // }, binding.value);
      } else {
        el.src = loadGif
      }
    })
    observe.observe(el)
  },
}
