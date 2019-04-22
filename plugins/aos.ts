import AOS from 'aos';
import 'aos/dist/aos.css';

export default ({ app }): void => {
  app.AOS = new AOS.init();
};
