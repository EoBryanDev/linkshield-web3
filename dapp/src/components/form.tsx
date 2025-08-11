"use client";
import { useState } from "react";
import hash from "object-hash";
import { addLink, connectContract } from "@/services/web3service";

const Form = () => {
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [fee, setFee] = useState("0");

  const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  const handleChangeFee = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFee(event.target.value);
  };

  const handleClickBtn = (_event: React.MouseEvent<HTMLButtonElement>) => {
    const linkId = hash(url).slice(0, 5);
    setMessage(url + " " + fee + " " + linkId);
    setMessage("");
    addLink({ url, linkId, feeInWei: fee })
      .then(() => {
        setUrl("");
        setFee("0");
        setMessage(
          `Seu link foi criado com sucesso: http://localhost:3000/${linkId}`
        );
      })
      .catch((error) => setMessage(error.message));
  };
  return (
    <>
      <div className='form-floating mb-3'>
        <input
          type='text'
          id='url'
          className='form-control'
          value={url || ""}
          onChange={handleChangeUrl}
        />
        <label htmlFor='url'>Link:</label>
      </div>
      <div className='row mb-3'>
        <div className='col-6'>
          <div className='form-floating'>
            <input
              type='number'
              id='fee'
              className='form-control'
              value={fee || ""}
              onChange={handleChangeFee}
            />
            <label htmlFor='fee'>Taxa por clique (wei):</label>
          </div>
        </div>
        <div className='col-6'>
          <button
            type='button'
            className='btn btn-primary w-100 h-100'
            onClick={handleClickBtn}
          >
            <img src='/metamaskpng.png' alt='metamask' width={32} />
            Conectar e criar link
          </button>
        </div>
      </div>
      {message && (
        <div className='alert alert-success p-3 col-12 mt-3'>{message}</div>
      )}
    </>
  );
};
export default Form;
