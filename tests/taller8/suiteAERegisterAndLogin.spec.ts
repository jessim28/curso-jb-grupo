import test from "@playwright/test";
import { Logger } from "../../helpers/utils/log.helper";
import path from "path";
import { getAuth, makeUser } from "../../helpers/utils/user.helper";
import { HomePage } from "../../pages/AE/Home.page";
import { AuthPage } from "../../pages/AE/Auth.page";
import { AccountPage } from "../../pages/AE/Account.page";
import { saveSession } from "../../helpers/utils/session.helper";

test.describe.serial('taller 8 : registrar + login', ()=> {

  test.beforeEach( async({browserName}, info)=> {
  Logger.start('TEST')
  Logger.info(` -> ${info.project.name} | ${browserName}`)
  })

  test.afterEach(async ({ browserName, page }, info) => {
      Logger.end();
      const filePath = path.join(
        process.cwd(),
        "artifacts",
        "taller8",
        `Suite2_${info.project.name}_${browserName}.png`,
      );
      await page.screenshot({ path: filePath });
    });

    test( "test registro y login", async ({page}) =>{
      const projectName = test.info().project.name;
      Logger.debug("Dispositivo Actual: ", projectName)
      if( projectName !== 'chromium' ){
        await test.step("Esperar 20 segundos antes de omitir", async()=>{
          await page.waitForTimeout(20000);
          test.skip(true, 'Solo chromium ejecuta la acción de crear usuario')
        })
      }

      const BASE_USERNAME ="jmujicac";

      const user = makeUser(BASE_USERNAME);

      const home = new HomePage (page);
      const auth = new AuthPage(page);
      const account = new AccountPage(page);

      await test.step("Abrir home y navegar a pagina de registro", async()=>{
        await home.open();
        await home.gotoSignupLogin();
      })

      await test.step("Registrarse", async()=>{
        await auth.startSignup(user.name, user.email);
      })

      await test.step("Completar Formulario", async () =>{
        await auth.completeAccountForm(user);
        await account.assertLoggedIn();
      })

      await test.step("Logout", async()=>{
        await account.logout();
      })

    })

    test("Login y guardar sesión", async({page})=>{
      const BASE_USERNAME ="jmujicac";
      const projectName = test.info().project.name;

      const creds = getAuth(BASE_USERNAME);

      const home = new HomePage (page);
      const auth = new AuthPage(page);
      const account = new AccountPage(page);

      await test.step("Abrir home y navegar a login", async()=>{
        await home.open();
        await home.gotoSignupLogin();
      })

      await test.step("Login con credenciales creados", async()=>{
        await auth.login(creds.email, creds.password);
        await account.assertLoggedIn();
      })

      await test.step("Guardar credenciales", async()=>{
        await saveSession(page, path.join(process.cwd(),'auth','taller8',`${projectName}.session.json`))
      })

    })

})