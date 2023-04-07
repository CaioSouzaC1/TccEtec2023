export const email_create_acc = (name, email, type) => {
  return `
  <table
  width="100%"
  border="0"
  cellpadding="0"
  cellspacing="0"
  role="presentation"
  style="background-color: #100f11"
>
  <tbody>
    <tr>
      <td>
        <table
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #b0002c"
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="m_1191253744728659595row-content m_1191253744728659595stack"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background-color: #fff; color: #000; width: 640px"
                  width="640"
                >
                  <tbody>
                    <tr>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-1"
                        width="100%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          padding-top: 0;
                          padding-bottom: 0;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          class="m_1191253744728659595row-2"
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #b0002c; background-size: auto"
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="m_1191253744728659595row-content m_1191253744728659595stack"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="
                    background-color: #fff;
                    background-size: auto;
                    color: #000;
                    width: 640px;
                  "
                  width="640"
                >
                  <tbody>
                    <tr>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-1"
                        width="100%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          padding-top: 5px;
                          padding-bottom: 0;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595heading_block m_1191253744728659595block-1"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-top: 15px;
                                  text-align: center;
                                  width: 100%;
                                "
                              >
                                <h1
                                  style="
                                    margin: 0;
                                    color: #100f11;
                                    direction: ltr;
                                    font-family: Arial, Helvetica Neue,
                                      Helvetica, sans-serif;
                                    font-size: 20px;
                                    font-weight: 700;
                                    letter-spacing: normal;
                                    line-height: 120%;
                                    text-align: center;
                                    margin-top: 0;
                                    margin-bottom: 0;
                                  "
                                >
                                  <span
                                    ><span class="il"
                                      >Sua conta Voice - ${
                                        type === "establishment"
                                          ? "Estabelecimento"
                                          : type === "artist"
                                          ? "Artista"
                                          : ""
                                      }</span
                                    >
                                    foi criada com sucesso</span
                                  >
                                </h1>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          class="m_1191253744728659595text_block m_1191253744728659595block-2"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="word-break: break-word"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-bottom: 20px;
                                  padding-left: 60px;
                                  padding-right: 60px;
                                  padding-top: 10px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    style="
                                      font-size: 14px;
                                      color: #555;
                                      line-height: 1.5;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: center;
                                      "
                                    >
                                      Estamos muito felizes em tê-lo(a) aqui,
                                      ${name}.
                                    </p>
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: center;
                                      "
                                    >
                                      Esperamos que você aproveite todos os
                                      recursos disponíveis em nossa plataforma e
                                      encontre o que está procurando. Não hesite
                                      em entrar em contato conosco se precisar
                                      de ajuda ou tiver alguma dúvida.
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #b0002c; background-size: auto"
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="m_1191253744728659595row-content m_1191253744728659595stack"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="
                    background-color: #fffefe;
                    background-size: auto;
                    color: #000;
                    width: 640px;
                  "
                  width="640"
                >
                  <tbody>
                    <tr>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-1"
                        width="100%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          padding-top: 0;
                          padding-bottom: 0;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595block-1"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-bottom: 10px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 5px;
                                "
                              >
                                <div
                                  class="m_1191253744728659595alignment"
                                  align="center"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    width="85%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="
                                            font-size: 1px;
                                            line-height: 1px;
                                            border-top: 1px solid #b0002c;
                                          "
                                        >
                                          <span> </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          class="m_1191253744728659595text_block m_1191253744728659595block-2"
                          width="100%"
                          border="0"
                          cellpadding="5"
                          cellspacing="0"
                          role="presentation"
                          style="word-break: break-word"
                        >
                          <tbody>
                            <tr>
                              <td class="m_1191253744728659595pad">
                                <div style="font-family: sans-serif">
                                  <div
                                    style="
                                      font-size: 14px;
                                      color: #555;
                                      line-height: 1.2;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: center;
                                      "
                                    >
                                      <span style="color: #000000"
                                        ><strong
                                          ><span style="font-size: 16px"
                                            >Começando na plataforma</span
                                          ></strong
                                        ></span
                                      >
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          class="m_1191253744728659595block-3"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-bottom: 35px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 10px;
                                "
                              >
                                <div
                                  class="m_1191253744728659595alignment"
                                  align="center"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    width="85%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="
                                            font-size: 1px;
                                            line-height: 1px;
                                            border-top: 1px solid #b0002c;
                                          "
                                        >
                                          <span> </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          class="m_1191253744728659595row-4"
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #b0002c; background-size: auto"
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="m_1191253744728659595row-content m_1191253744728659595stack"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="
                    background-color: #fff;
                    border-radius: 0;
                    color: #000;
                    background-size: auto;
                    width: 640px;
                  "
                  width="640"
                >
                  <tbody>
                    <tr>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-1"
                        width="41.666666666666664%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595text_block m_1191253744728659595block-3"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="word-break: break-word"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-bottom: 10px;
                                  padding-left: 60px;
                                  padding-right: 10px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    style="
                                      font-size: 14px;
                                      color: #555;
                                      line-height: 1.5;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <p style="margin: 0; font-size: 16px">
                                      Seja bem-vindo(a) à nossa plataforma.
                                      Sabemos que começar em uma nova plataforma
                                      pode ser intimidante, mas estamos aqui
                                      para ajudá-lo(a) a se familiarizar com
                                      nossos recursos.
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-2"
                        width="58.333333333333336%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595image_block m_1191253744728659595block-2"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-right: 20px;
                                  width: 100%;
                                  padding-left: 0;
                                "
                              >
                                <div
                                  class="m_1191253744728659595alignment"
                                  align="center"
                                  style="line-height: 10px"
                                >
                                  <img
                                    class="m_1191253744728659595big CToWUd a6T"
                                    src="https://i.ibb.co/khVdJpF/personavoice2.png"
                                    style="
                                      display: block;
                                      height: auto;
                                      border: 0;
                                      width: 270px;
                                      max-width: 100%;
                                      border-radius: 8px;
                                      -webkit-transform: scaleX(-1);
                                      transform: scaleX(-1);
                                      margin-right: 0;
                                    "
                                    width="351"
                                    data-bit="iit"
                                    tabindex="0"
                                  />
                                  <div
                                    class="a6S"
                                    dir="ltr"
                                    style="
                                      opacity: 0.01;
                                      left: 955.828px;
                                      top: 620.375px;
                                    "
                                  >
                                    <div
                                      id=":13m"
                                      class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
                                      role="button"
                                      tabindex="0"
                                      aria-label="Download attachment "
                                      jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB; 4:WyIjbXNnLWY6MTc1MzkxNjkxNTY2MjU4NDgyMyIsbnVsbCxbXV0."
                                      data-tooltip-class="a1V"
                                      data-tooltip="Download"
                                    >
                                      <div class="akn">
                                        <div class="aSK J-J5-Ji aYr"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          class="m_1191253744728659595row-5"
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #b0002c; background-size: auto"
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="m_1191253744728659595row-content m_1191253744728659595stack"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="
                    background-color: #fff;
                    border-radius: 0;
                    color: #000;
                    background-size: auto;
                    width: 640px;
                  "
                  width="640"
                >
                  <tbody>
                    <tr>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-1"
                        width="16.666666666666668%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595image_block m_1191253744728659595block-2"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-left: 45px;
                                  width: 100%;
                                  padding-right: 0;
                                  padding-top: 5px;
                                  padding-bottom: 5px;
                                "
                              >
                                <div
                                  class="m_1191253744728659595alignment"
                                  align="right"
                                  style="line-height: 10px"
                                >
                                  <img
                                    src="https://ci6.googleusercontent.com/proxy/pqchVtC3YWVQi31rP2un-dFLQehFGDteA3R4m0jdRV1HxkZQrqH35mNYH6HPAJlpvVyfGYJrquPlu6qNaIlE-dB618QJFbCxtYSPvhSHeUqq2wZ44ibqldhvQR9MVEdnpDg=s0-d-e1-ft#https://userimg-bee.customeriomail.com/images/client-env-99921/Group%201055.png"
                                    style="
                                      display: block;
                                      height: auto;
                                      border: 0;
                                      width: 55px;
                                      max-width: 100%;
                                    "
                                    width="55"
                                    class="CToWUd"
                                    data-bit="iit"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-2"
                        width="83.33333333333333%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595text_block m_1191253744728659595block-2"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="word-break: break-word"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-bottom: 15px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 15px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    style="
                                      font-size: 14px;
                                      color: #555;
                                      line-height: 1.5;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <p style="margin: 0; font-size: 14px">
                                      <strong
                                        ><span style="color: #000000"
                                          >Faça o login na plataforma</span
                                        ></strong
                                      >
                                    </p>
                                    <p style="margin: 0; font-size: 14px">
                                      Para acessar todas as funcionalidades da
                                      plataforma, é necessário fazer login.
                                      Insira suas credenciais na página de login
                                      para começar.
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <table
          class="m_1191253744728659595row-7"
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #f6f6f6"
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="m_1191253744728659595row-content m_1191253744728659595stack"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="
                    background-color: #fff;
                    border-radius: 0;
                    color: #000;
                    width: 640px;
                  "
                  width="640"
                >
                  <tbody>
                    <tr>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-1"
                        width="16.666666666666668%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595image_block m_1191253744728659595block-2"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-left: 45px;
                                  width: 100%;
                                  padding-right: 0;
                                "
                              >
                                <div
                                  class="m_1191253744728659595alignment"
                                  align="right"
                                  style="line-height: 10px"
                                >
                                  <img
                                    src="https://ci4.googleusercontent.com/proxy/0Zm41ahAfKrP6GjsV8gYx6qVyo6u8KqLrwXDIo18YDh-sQwlduLYeSoiABOFj1aMtEYZ19iz7kFrJoUAzsTHWRb4c1j4ozl49AAG6qLp40Vc_M5IyCjRgLQ9TxXWy_OGZyA=s0-d-e1-ft#https://userimg-bee.customeriomail.com/images/client-env-99921/Group%201057.png"
                                    style="
                                      display: block;
                                      height: auto;
                                      border: 0;
                                      width: 55px;
                                      max-width: 100%;
                                    "
                                    width="55"
                                    class="CToWUd"
                                    data-bit="iit"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-2"
                        width="83.33333333333333%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595text_block m_1191253744728659595block-2"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="word-break: break-word"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-bottom: 15px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 15px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    style="
                                      font-size: 14px;
                                      color: #555;
                                      line-height: 1.5;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <p style="margin: 0; font-size: 14px">
                                      <strong
                                        ><span style="color: #000000"
                                          >Seu perfil do seu jeito</span
                                        ></strong
                                      >
                                    </p>
                                    <p style="margin: 0; font-size: 14px">
                                      Personalize da forma que desejar.
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #f6f6f6"
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="m_1191253744728659595row-content m_1191253744728659595stack"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background-color: #fff; color: #000; width: 640px"
                  width="640"
                >
                  <tbody>
                    <tr>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-1"
                        width="100%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          padding-top: 0;
                          padding-bottom: 0;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595image_block m_1191253744728659595block-1"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  width: 100%;
                                  padding-right: 0;
                                  padding-left: 0;
                                "
                              >
                                <div
                                  class="m_1191253744728659595alignment"
                                  align="center"
                                  style="line-height: 10px"
                                >
                                  <img
                                    class="m_1191253744728659595big CToWUd a6T"
                                    src="https://i.ibb.co/tYdHQY5/artistaprofile3.png"
                                    style="
                                      display: block;
                                      height: auto;
                                      border: 0;
                                      width: 576px;
                                      max-width: 100%;
                                      border-radius: 8px;
                                    "
                                    width="576"
                                    data-bit="iit"
                                    tabindex="0"
                                  />
                                  <div
                                    class="a6S"
                                    dir="ltr"
                                    style="
                                      opacity: 0.01;
                                      left: 945px;
                                      top: 1267.48px;
                                    "
                                  >
                                    <div
                                      id=":13q"
                                      class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
                                      role="button"
                                      tabindex="0"
                                      aria-label="Download attachment "
                                      jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB; 4:WyIjbXNnLWY6MTc1MzkxNjkxNTY2MjU4NDgyMyIsbnVsbCxbXV0."
                                      data-tooltip-class="a1V"
                                      data-tooltip="Download"
                                    >
                                      <div class="akn">
                                        <div class="aSK J-J5-Ji aYr"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          class="m_1191253744728659595row-9"
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #f6f6f6"
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="m_1191253744728659595row-content m_1191253744728659595stack"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="
                    background-color: #fff;
                    border-radius: 0;
                    color: #000;
                    width: 640px;
                  "
                  width="640"
                >
                  <tbody>
                    <tr>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-1"
                        width="16.666666666666668%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595image_block m_1191253744728659595block-2"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-left: 45px;
                                  width: 100%;
                                  padding-right: 0;
                                "
                              >
                                <div
                                  class="m_1191253744728659595alignment"
                                  align="right"
                                  style="line-height: 10px; margin-top: 8px"
                                >
                                  <img
                                    src="https://ci5.googleusercontent.com/proxy/DU-35Or3gQHhpGQapez4d-rxewuhY-UQjiXoJREZ0aGRei0ms6Me1vS5E0F8DfjHg60cc6k5aQwDsj0oVchjL2U2R7xPO12VxNs6iCZCdiROrtLtwCqCi58-Vh1flhko2H4=s0-d-e1-ft#https://userimg-bee.customeriomail.com/images/client-env-99921/Group%201059.png"
                                    style="
                                      display: block;
                                      height: auto;
                                      border: 0;
                                      width: 55px;
                                      max-width: 100%;
                                    "
                                    width="55"
                                    class="CToWUd"
                                    data-bit="iit"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-2"
                        width="83.33333333333333%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595text_block m_1191253744728659595block-2"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="word-break: break-word"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-bottom: 15px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 15px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    style="
                                      font-size: 14px;
                                      color: #555;
                                      line-height: 1.5;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <p style="margin: 0; font-size: 14px">
                                      <strong
                                        ><span style="color: #000000"
                                          >Converse com outros usuários no
                                          chat</span
                                        ></strong
                                      >
                                    </p>
                                    <p style="margin: 0; font-size: 14px">
                                      Em tempo real, vocês conversam, decidem a
                                      melhor data e horário para confirmarem o
                                      evento.
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #f6f6f6"
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="m_1191253744728659595row-content m_1191253744728659595stack"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background-color: #fff; color: #000; width: 640px"
                  width="640"
                >
                  <tbody>
                    <tr>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-1"
                        width="100%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          padding-top: 0;
                          padding-bottom: 0;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595image_block m_1191253744728659595block-1"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  width: 100%;
                                  padding-right: 0;
                                  padding-left: 0;
                                "
                              >
                                <div
                                  class="m_1191253744728659595alignment"
                                  align="center"
                                  style="line-height: 10px"
                                >
                                  <img
                                    class="m_1191253744728659595big CToWUd a6T"
                                    src="https://i.ibb.co/tPLMf3W/chatimage.png"
                                    style="
                                      display: block;
                                      height: auto;
                                      border: 0;
                                      width: 576px;
                                      max-width: 100%;
                                      border-radius: 8px;
                                    "
                                    width="576"
                                    data-bit="iit"
                                    tabindex="0"
                                  />
                                  <div
                                    class="a6S"
                                    dir="ltr"
                                    style="opacity: 0.01"
                                  >
                                    <div
                                      id=":13r"
                                      class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
                                      title="Download"
                                      role="button"
                                      tabindex="0"
                                      aria-label="Download attachment "
                                      jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB; 4:WyIjbXNnLWY6MTc1MzkxNjkxNTY2MjU4NDgyMyIsbnVsbCxbXV0."
                                      data-tooltip-class="a1V"
                                    >
                                      <div class="akn">
                                        <div class="aSK J-J5-Ji aYr"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          class="m_1191253744728659595row-11"
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #f6f6f6"
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="m_1191253744728659595row-content m_1191253744728659595stack"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="
                    background-color: #fff;
                    border-radius: 0;
                    color: #000;
                    width: 640px;
                  "
                  width="640"
                >
                  <tbody>
                    <tr>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-1"
                        width="16.666666666666668%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595image_block m_1191253744728659595block-2"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-left: 45px;
                                  width: 100%;
                                  padding-right: 0;
                                "
                              >
                                <div
                                  class="m_1191253744728659595alignment"
                                  align="right"
                                  style="line-height: 10px; margin-top: 8px"
                                >
                                  <img
                                    src="https://ci4.googleusercontent.com/proxy/AvaHPYYwXcbqMZX0RW3G9Y_tJi9KgzD3RZ2zHelnG1sKh0RabrXE9gDk-Kaxg7kPPukG7w1dsIQTf1Z9b_vM-P_5fMdT19XVsjaycWOQMNRrdSAV5RtaGI39lR9PjvvB3b0=s0-d-e1-ft#https://userimg-bee.customeriomail.com/images/client-env-99921/Group%201060.png"
                                    style="
                                      display: block;
                                      height: auto;
                                      border: 0;
                                      width: 55px;
                                      max-width: 100%;
                                    "
                                    width="55"
                                    class="CToWUd"
                                    data-bit="iit"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-2"
                        width="83.33333333333333%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595text_block m_1191253744728659595block-2"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="word-break: break-word"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-bottom: 15px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 15px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    style="
                                      font-size: 14px;
                                      color: #000;
                                      line-height: 1.5;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <p style="margin: 0; font-size: 14px">
                                      <strong>Curta nosso sistema</strong>
                                    </p>
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        color: #555;
                                      "
                                    >
                                      Aproveite ao máximo a plataforma e todas
                                      as suas funcionalidades! Temos certeza de
                                      que você terá uma ótima experiência aqui.
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #f6f6f6"
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="m_1191253744728659595row-content m_1191253744728659595stack"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background-color: #fff; color: #000; width: 640px"
                  width="640"
                >
                  <tbody>
                    <tr>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-1"
                        width="100%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          padding-top: 0;
                          padding-bottom: 0;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #f6f6f6"
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="m_1191253744728659595row-content m_1191253744728659595stack"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background-color: #fff; color: #000; width: 640px"
                  width="640"
                >
                  <tbody>
                    <tr>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-1"
                        width="100%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          padding-top: 0;
                          padding-bottom: 0;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595text_block m_1191253744728659595block-1"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="word-break: break-word"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_1191253744728659595pad"
                                style="
                                  padding-left: 20px;
                                  padding-right: 20px;
                                  padding-top: 20px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    style="
                                      font-size: 12px;
                                      color: #100f11;
                                      line-height: 1.2;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <p
                                      dir="ltr"
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: center;
                                        letter-spacing: normal;
                                      "
                                    >
                                      <span
                                        style="color: #949494; font-size: 12px"
                                        ><span style="color: #454444"
                                          >Caso você tenha alguma dúvida e não
                                          encontre as respostas em nossa página
                                          de perguntas frequentes,  entre em contato conosco pelo
                                          e-mail</span
                                        >
                                      
                                         </span>
                                        </span>
                                      <span
                                        style="color: #949494; font-size: 12px"
                                        ><span style="color: #0c8aed"
                                          ><a
                                            href="mailto:tcc2023eteccps@gmail.com"
                                            target="_blank"
                                            >tcc2023eteccps@gmail.com</a
                                          ></span
                                        >
                                        -<span style="color: #454444">
                                          Teremos o prazer de ajudar</span
                                        ></span
                                      >
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          class="m_1191253744728659595text_block m_1191253744728659595block-2"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="word-break: break-word"
                        >
                          <tbody>
                            <tr>
                              <td class="m_1191253744728659595pad">
                                <div style="font-family: sans-serif">
                                  <div
                                    style="
                                      font-size: 12px;
                                      color: #7e7885;
                                      line-height: 1.2;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <p style="margin: 0; font-size: 12px">
                                      &nbsp;
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #f6f6f6"
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="m_1191253744728659595row-content m_1191253744728659595stack"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background-color: #f6f6f6; color: #000; width: 640px"
                  width="640"
                >
                  <tbody>
                    <tr>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-1"
                        width="100%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          padding-top: 0;
                          padding-bottom: 0;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595text_block m_1191253744728659595block-1"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="word-break: break-word"
                        >
                          <tbody>
                            <tr>
                              <td class="m_1191253744728659595pad">
                                <div style="font-family: sans-serif">
                                  <div
                                    style="
                                      font-size: 12px;
                                      color: #7e7885;
                                      line-height: 1.2;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <p style="margin: 0; font-size: 12px">
                                      &nbsp;
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #f6f6f6"
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="m_1191253744728659595row-content m_1191253744728659595stack"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background-color: #f6f6f6; color: #000; width: 640px"
                  width="640"
                >
                  <tbody>
                    <tr>
                      <td
                        class="m_1191253744728659595column m_1191253744728659595column-1"
                        width="100%"
                        style="
                          font-weight: 400;
                          text-align: left;
                          vertical-align: top;
                          padding-top: 5px;
                          padding-bottom: 5px;
                          border-top: 0;
                          border-right: 0;
                          border-bottom: 0;
                          border-left: 0;
                        "
                      >
                        <table
                          class="m_1191253744728659595text_block m_1191253744728659595block-1"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="word-break: break-word"
                        >
                          <tbody>
                            <tr>
                              <td class="m_1191253744728659595pad">
                                <div style="font-family: sans-serif">
                                  <div
                                    style="
                                      font-size: 12px;
                                      color: #7e7885;
                                      line-height: 1.5;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <p style="margin: 0; text-align: center">
                                      &nbsp;
                                    </p>
                                    <p style="margin: 0; text-align: center">
                                      Esse email foi enviado para
                                      <span style="color: #4da0fd"
                                        ><a
                                          href="mailto:${email}"
                                          target="_blank"
                                          >${email}</a
                                        ></span
                                      >.
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

  `;
};

export const APP_URL = "http://localhost:5173";
