class PopUp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML += `
      <style>
      /* ------------------------ RESET ---------------------------- */

      a,hr{color:inherit}progress,sub,sup{vertical-align:baseline}blockquote,body,dd,dl,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,menu,ol,p,pre,ul{margin:0}fieldset,legend,menu,ol,ul{padding:0}*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color,#e5e7eb)}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"}body{line-height:inherit}hr{height:0;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}menu,ol,ul{list-style:none}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}
  
      /* -------------------------------------------------------------- */
  
        .popUp-container {
          position: fixed;
          inset: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.3);
        }
  
        .popUp {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1.25rem;
          width: 25rem;
          height: 30rem;
          background-color: white;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);
        }
  
        .ri-close-line {
          position: absolute;
          top: 0rem;
          right: 1rem;
          color: #4b5563;
          font-size: 1.5rem;
          font-weight: 500;
        }
  
        .ri-close-line:hover {
          cursor: pointer;
        }
  
        .titles {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
        }
  
        h1 {
          text-align: center;
          font-size: 1.125rem;
          line-height: 1.75rem;
          color: #4b5563;
        }
  
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding-top: 1.25rem;
        }
  
        input {
          width: 100%;
          height: 4rem;
          background-color: #f3f4f6;
          border-radius: 0.5rem;
          border-width: 2px;
          border-color: #e5e7eb;
          padding: 1rem !important;
        }
  
        p {
          text-align: center;
          font-size: 0.75rem;
          line-height: 1rem;
          color: #9ca3af;
          margin-top: 1rem;
        }
  
        input[type="submit"] {
          width: 10rem;
          height: 4rem;
          margin-top: 1rem;
          background-color: #06b6d4;
          border-radius: 0.5rem;
          border-width: 2px;
          border-color: #0891b2;
          font-size: 1.125rem;
          color: white;
          padding: 1rem 0rem 1rem 0rem;
        }
  
        input[type="submit"]:hover {
          cursor: pointer;
          background-color: #22d3ee;
        }
  
        input[type="submit"]:active {
          background-color: #0891b2;
        }
  
        .hidden {
          display: none;
        }
  
        @media (min-width: 768px) {
          .popUp {
            width: 40rem;
          }
  
          h1 {
            font-size: 1.5rem !important;
            line-height: 2rem !important;
          }
        }
      </style>
    `;

    const popUpContainer = document.createElement("div");
    popUpContainer.classList.add("popUp-container");
    popUpContainer.setAttribute("id", "modal");

    const modal = document.createElement("div");
    modal.classList.add("popUp");
    popUpContainer.appendChild(modal);

    const closeBtn = document.createElement("p");
    closeBtn.innerText = "x";
    closeBtn.classList.add("ri-close-line");
    modal.appendChild(closeBtn);

    const titles = document.createElement("div");
    titles.classList.add("titles");
    modal.appendChild(titles);

    const firstTitle = document.createElement("h1");
    firstTitle.innerText = `${this.getAttribute("first-title")}`;
    titles.appendChild(firstTitle);

    const secondTitle = document.createElement("h1");
    secondTitle.innerText = `${this.getAttribute("second-title")}`;
    titles.appendChild(secondTitle);

    const form = document.createElement("form");
    form.setAttribute("id", "form");
    form.setAttribute(
      "action",
      `https://formsubmit.co/${this.getAttribute("email-to")}`
    );
    form.setAttribute("method", `post`);
    modal.appendChild(form);

    const inputTemplate = document.createElement("input");
    inputTemplate.setAttribute("type", "hidden");
    inputTemplate.setAttribute("name", "_template");
    inputTemplate.setAttribute("value", "box");

    const inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("name", "name");
    inputText.setAttribute("placeholder", "Nome completo");
    inputText.setAttribute("required", "");

    const inputEmail = document.createElement("input");
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("name", "email");
    inputEmail.setAttribute("placeholder", "E-mail");
    inputEmail.setAttribute("required", "");

    const inputSubject = document.createElement("input");
    inputSubject.setAttribute("type", "hidden");
    inputSubject.setAttribute("name", "_subject");
    inputSubject.setAttribute("value", "Pop Up: Novo Lead em Contato");

    const inputResponse = document.createElement("input");
    inputResponse.setAttribute("type", "hidden");
    inputResponse.setAttribute("name", "_autoresponse");
    inputResponse.setAttribute(
      "value",
      "Sua mensagem foi recebida com sucesso. Agradecemos por entrar em contato a MTP. Nossa equipe está trabalhando em sua solicitação e retornaremos em breve. Se você não esperava receber essa menssagem, por favor ignore."
    );

    form.appendChild(inputTemplate);
    form.appendChild(inputText);
    form.appendChild(inputEmail);
    form.appendChild(inputSubject);
    form.appendChild(inputResponse);

    const smallText = document.createElement("p");
    smallText.innerText = `${this.getAttribute("small-text")}`;
    form.appendChild(smallText);

    const sendMessage = document.createElement("input");
    sendMessage.setAttribute("type", "submit");
    sendMessage.setAttribute("value", "Quero conhecer");
    form.appendChild(sendMessage);

    this.shadowRoot.appendChild(popUpContainer);
  }

  connectedCallback() {
    const closeBtn = this.shadowRoot.querySelector(".ri-close-line");
    const modal = this.shadowRoot.querySelector("#modal");
    const form = this.shadowRoot.querySelector("#form");
    const showModal = localStorage.getItem("modalVisible");

    // caso os dados sejam enviados, não exibir o modal novamente
    if (showModal === "false") {
      modal.classList.add("hidden");
    }

    form.addEventListener("submit", () => {
      localStorage.setItem("modalVisible", "false");
    });

    // close modal
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }
}

window.customElements.define("pop-up-submit", PopUp);
