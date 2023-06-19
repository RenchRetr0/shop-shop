import s from './style.module.css'

const AboutPage = () => {
  return (
    <div className="container">
      <div className={s.about}>
        <img
          className={s.about_img}
          src="llogo.avif"
          alt=""
          width={300}
          height={300}
        />
        <p className={s.about_time}>
          Добро пожаловать в наш интернет-магазин канцелярских товаров! <br />
          Режим работы: ПН-ПТ с 9:00 до 18:00.
        </p>
        <h6 className={s.about_contact}>Контакты:</h6>
        <ul className={s.about_links}>
          <li>
            <a className={s.about_link} href="mailto:example@example.com">
              example@example.com
            </a>
          </li>
          <li>
            <a className={s.about_link} href="tel:+7123456789">
              +7 (123) 456-78-9
            </a>
          </li>
        </ul>
        <p className={s.about_info}>
          С уважением, <br />
          Команда интернет-магазина канцелярских товаров.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
