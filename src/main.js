/* eslint-disable no-console,no-unused-vars */
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.directive('sidebar', {
  bind(el, binding, vnode) {
    console.log(binding.value);
    let supportPageOffset = window.pageXOffset !== undefined;
    let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

    let lastScrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    let wasScrollingDown = true;

    if (el !== null) {
      let initialSidebarTop = el.offsetTop;
      window.addEventListener('scroll', () => {
        let windowHeight = window.innerHeight;
        let sidebarHeight = el.offsetHeight;

        let scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
        let scrollBottom = scrollTop + windowHeight;

        let sidebarTop = el.offsetTop;
        let sidebarBottom = sidebarTop + sidebarHeight;

        let heightDelta = Math.abs(windowHeight - sidebarHeight);
        let scrollDelta = lastScrollTop - scrollTop;

        let isScrollingDown = (scrollTop > lastScrollTop);
        let isWindowLarger = (windowHeight > sidebarHeight);

        if ((isWindowLarger && scrollTop > initialSidebarTop) || (!isWindowLarger && scrollTop > initialSidebarTop + heightDelta)) {
          el.classList.add('fixed');
        } else if (!isScrollingDown && scrollTop <= initialSidebarTop) {
          el.classList.remove('fixed');
        }

        let dragBottomDown = (sidebarBottom <= scrollBottom && isScrollingDown);
        console.log('sidebar top (should be higher):' + sidebarTop);
        console.log(scrollTop);
        let dragTopUp = (sidebarTop >= scrollTop && !isScrollingDown);

        if (dragBottomDown) {
          if (isWindowLarger) {
            el.style.top = '100px';
          } else {
            el.style.top = -heightDelta + 'px';
          }
        } else if (dragTopUp) {
          el.style.top = '0'
        } else if (el.classList.contains('fixed')) {
          let currentTop = parseInt(el.style.top, 10);

          let minTop = -heightDelta;
          let scrolledTop = currentTop + scrollDelta;

          let isPageAtBottom = (scrollTop + windowHeight >= document.innerHeight);
          let newTop = (isPageAtBottom) ? minTop : scrolledTop;

          el.style.top = newTop + 'px';
        }

        lastScrollTop = scrollTop;
        wasScrollingDown = isScrollingDown;
      })
    }
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
