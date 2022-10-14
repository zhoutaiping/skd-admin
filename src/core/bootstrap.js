import store from "@/store";
import Fetch from "@/api/fetch-account";

export default async function initializer() {
  try {
    const data = await Fetch.get("/global/setting", {});
    localStorage.setItem("domain_suffix", data.domain_suffix || "");
    store.commit("settings/DOMAIN_SUFFIX", data.domain_suffix);
  } catch (error) {
    return;
  }
}
