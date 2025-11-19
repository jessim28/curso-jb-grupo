import { test } from "@playwright/test";
import { HomePage } from "../../pages/AE/Home.page";
import { AuthPage } from "../../pages/AE/Auth.page";
import { getAuth } from "../../helpers/utils/user.helper";
import { ProductsPage } from "../../pages/integrador/products.page";
import { CartPage } from "../../pages/integrador/cart.page";
import { stateExists, STATE_PATH } from "../../helpers/utils/state.helper";
import { AccountPage } from "../../pages/AE/Account.page";
import { Logger } from "../../helpers/utils/log.helper";


/** Flag para saber si existe un storageState previo. */
const hasStoredState = stateExists();
const describeAuthenticated = hasStoredState ? test.describe : test.describe.skip;


test.describe.serial("Suite 2: - Seleccionar producto", () => {

  describeAuthenticated("Flujos autenticados (requiere storageState)", () => {
    if (!hasStoredState) return;
    test.use({ storageState: STATE_PATH });
  });

  /** Flujo end-to-end: login, selección de productos, checkout y logout. */
  test("Suite 2 - Flujo de selección y compra", async ({ page }) => {
    
      const BASE_USERNAME ="jmujicac";
    
      const creds = getAuth(BASE_USERNAME);
      
      const home = new HomePage(page);
      const products = new ProductsPage(page);
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

      await products.goToProducts();

      await products.searchProduct();
      
      await products.addTwoJeans();
      
      await products.filterProductWomen();

      await products.itemsWomenTops();

      await cart.openCart();

      await cart.validateItems(4);

      await cart.checkout();

      await cart.placeOrder();

      await account.logout();
      Logger.info("Validar que se realiza el logout")

  })

});
