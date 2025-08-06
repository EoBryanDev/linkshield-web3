export default function Home() {
  return (
    <>
      <div className='container px-4 py-5'>
        <div className='row flex-lg-row-reverse align-items-center g-5 py-5'>
          <div className='col-6'>
            <img
              src='https://png.pngtree.com/png-vector/20231116/ourmid/pngtree-elegant-golden-shield-png-image_10625519.png'
              alt='shield'
              className='d-block mx-lg-auto img-fluid'
              width={700}
              height={500}
            />
          </div>
          <div className='col-6'>
            <h1 className='display-5 fw-bold text-body-emphasis lh-1 mb-3'>
              LinkShield
            </h1>
            <p className='lead'>Proteja seus links. Lucre com eles.</p>
            <hr />
            <p>
              Cole a sua URL abaixo, defina a axa por clique e conecte sua
              carteira para proteger seu link com a tech blockchain
            </p>
            <div className='form-floating mb-3'>
              <input type='text' id='url' className='form-control' />
              <label htmlFor='url'>Link:</label>
            </div>
            <div className='row mb-3'>
              <div className='col-6'>
                <div className='form-floating'>
                  <input type='number' id='fee' className='form-control' />
                  <label htmlFor='fee'>Taxa por clique (wei):</label>
                </div>
              </div>
              <div className='col-6'>
                <button type='button' className='btn btn-primary w-100 h-100'>
                  <img src='/metamaskpng.png' alt='metamask' width={32} />
                  Conectar e criar link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
