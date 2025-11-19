import { test } from '@playwright/test';
import { HomePage } from '../../pages/AE/Home.page';
import { stateExists, STATE_PATH } from '../../helpers/utils/state.helper';
import { CartPage } from "../../pages/integrador/cart.page";
import { AccountPage } from '../../pages/AE/Account.page';
import { Logger } from '../../helpers/utils/log.helper';
import { getAuth } from "../../helpers/utils/user.helper";
import { AuthPage } from '../../pages/AE/Auth.page';


/** Flag para saber si existe un storageState previo. */
const hasStoredState = stateExists();
const describeAuthenticated = hasStoredState ? test.describe : test.describe.skip;

test.describe.serial("Suite 3: - Flujo de pago de compra", () => {

  describeAuthenticated("Flujo autenticado (requiere storageState)", () => {
    if (!hasStoredState) return;
    test.use({ storageState: STATE_PATH });

    test.beforeEach(async () => {
    Logger.start("TEST");
  });
  
  test.afterEach(async () => {
    Logger.end();
  }); 

    /** Flujo end-to-end: login, revisión de carrito, pago y logout. */
    test("Suite 3 - Flujo de review y payment", async ({ page }) => {

      const BASE_USERNAME ="jmujicac";
    
      const creds = getAuth(BASE_USERNAME);

      const home = new HomePage(page);
      const auth = new AuthPage(page);            
      
      const cart = new CartPage(page);
      const account = new AccountPage(page);

      await test.step("Abrir home y navegar a login", async()=>{
        await home.open();
        await home.gotoSignupLogin();
      })

      await test.step("Login con credenciales creados", async()=>{
        await auth.login(creds.email, creds.password);
      })

      await cart.openCart();

      await cart.validateItems(4);

      await cart.checkout();

      await cart.placeOrder();

      await cart.paymentOrder();

      await account.logout();
      Logger.info("Validar que se realiza el logout")

    });
  });
});
