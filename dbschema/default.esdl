using extension auth;

module default {

  global current_user := global ext::auth::ClientTokenIdentity;

  type Post {
    required text: str;
    required author: ext::auth::Identity;

    access policy author_has_full_access
      allow all
      using (.author ?= global current_user);

    access policy others_read_only
      allow select;
  }
  
}
