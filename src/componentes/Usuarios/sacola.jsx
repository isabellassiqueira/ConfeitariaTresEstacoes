import React from "react";
import "./Sacola.css";

const Sacola = ({ aberto, setAberto, itens, setItens }) => {
  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  // Função para remover um item (diminuir quantidade ou remover)
  const removerItem = (id) => {
    setItens((prevItens) => {
      const item = prevItens.find(i => i.id === id);
      if (!item) return prevItens;

      if (item.quantidade === 1) {
        // Remove item
        return prevItens.filter(i => i.id !== id);
      } else {
        // Diminui quantidade
        return prevItens.map(i =>
          i.id === id ? { ...i, quantidade: i.quantidade - 1 } : i
        );
      }
    });
  };

  return (
    <>
      <div className={`sacola ${aberto ? "aberto" : ""}`}>
        <h2>Sacola</h2>
        {itens.length === 0 ? (
          <p>Sua sacola está vazia.</p>
        ) : (
          <ul>
            {itens.map(item => (
              <li key={item.id} className="item-sacola">
                <strong>{item.nome}</strong> <br />
                Quantidade: {item.quantidade} <br />
                Preço unitário: R$ {item.preco.toFixed(2)} <br />
                Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)} <br />
                <button className="btn-remover" onClick={() => removerItem(item.id)}>
                  Remover 1
                </button>
              </li>
            ))}
          </ul>
        )}
        <hr />
        <p><strong>Total: R$ {total.toFixed(2)}</strong></p>
        <button className="botao-finalizar" disabled={itens.length === 0}>
          Finalizar Compra
        </button>
        <button className="botao-fechar" onClick={() => setAberto(false)}>
          Fechar
        </button>
      </div>

      {aberto && <div className="overlay" onClick={() => setAberto(false)}></div>}
    </>
  );
};

export default Sacola;