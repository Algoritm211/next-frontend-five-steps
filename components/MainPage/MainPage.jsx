import React from 'react';
import Link from "next/link";

const MainPage = () => {
  return (
    <div className='mainContainer'>
      <div className='item N1'>
        <h6>Нова професія</h6>
        <h3>Дизайнер навчальних програм</h3>
        <p>якщо ти хочеш працювати в сфері освіти, навчати інших, працювати з великим обсягом текстута кращими
          експертами світу</p>
        <p><a href='goo.gle'>Дізнатися більше</a></p>
      </div>
      <div className='subGrid justify-content-center'>
        <div className='item N2'>
          <div className='d-flex'
               style={{ height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div className=''>
              <div className='col-12'><h6 className='text-dark'>Інтервью з Ілоном Маском</h6>
                <h3>Як це, бути щасливим?</h3></div>
            </div>

            <div className='justify-content-end'>
              <div className='col-2'>
                <p className='text-dark align-self-end'><a href=''>Переглянути</a></p></div>
            </div>
          </div>
        </div>
        <div className='item N3'>

        </div>
        <div className='smallGrid'>
          <div className='item N4'>
            <div className='d-flex' style={{ height: '100%', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div className='row'>
                <div className='col-12'><h3 className='text-dark'>EQ Test</h3>
                  <h6>На скільки розвінений твій емоційний інтелект, хлопче?</h6></div>
              </div>

              <div className='mt-auto justify-content-end'>

                <p className='text-dark align-self-end'><a href=''>Пройти</a></p></div>
            </div>
          </div>
          <div className='item N5 d-flex align-items-center'>
            <img className='mainPlateImage' src='https://img.yakaboo.ua/media/catalog/product/cache/1/image/398x565/234c7c011ba026e66d29567e1be1d1f7/n/a/nachytysa_vchytysa_1000.jpg' alt='' />
          </div>
        </div>
        <div className='item N6 d-flex align-items-center'>
          <div>
            <h3 className='text-black'>Всі професії</h3>
            <Link href='/professions'><h6 className='text-white'>Перейти</h6></Link>
          </div>
        </div>
        <div className='smallGrid exception'>
          <div className='item N7 d-flex align-items-center'>
            <div>
              <h6 className='text-white'>Дослідження</h6>
              <h3 className='text-white'>Книги, які допомагають визначитись з професією</h3>
              <a className='align-self-end' href='goo.gle'><h6 className='text-white'>Дослідження</h6></a>
            </div>
          </div>
          <div className='item N8 d-flex align-items-center justify-content-center'>
            <iframe width='100%' height='100%' src='https://www.youtube.com/embed/dQw4w9WgXcQ'
                    title='YouTube video player' frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen/>
          </div>
        </div>
        <div className='item N9 d-flex align-items-center justify-content-center'>
          <h3 className='text-dark'>Технологія "5 кроків"</h3>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
