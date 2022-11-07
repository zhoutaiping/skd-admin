import store from "@/store";
import Fetch from "@/api/fetch-account";

export default async function initializer() {
  try {
    const data = await Fetch.get("/global/setting", {});
    localStorage.setItem("domain_suffix", data.domain_suffix || "");
    localStorage.setItem(
      "user_role_type_list",
      JSON.stringify(data.user_role_type_list) || []
    );
    store.commit("settings/DOMAIN_SUFFIX", data.domain_suffix);
    store.commit(
      "settings/USER_ROLE_TYPE_LIST",
      data.user_role_type_list || []
    );
  } catch (error) {
    return;
  }
}
