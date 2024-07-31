CREATE MIGRATION m1ktl6hhvmrqip5cezvpbzikvrww4rglz7h46w6tvg5mkig5f7s5rq
    ONTO m1gejt3jtdbq4ixv25ocfklxo55gvsbtyhdkr2hyrbcis3jeo4osrq
{
  CREATE TYPE default::User {
      CREATE REQUIRED LINK identity: ext::auth::Identity;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE GLOBAL default::current_user := (std::assert_single((SELECT
      default::User
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
  CREATE TYPE default::Post {
      CREATE REQUIRED LINK author: default::User;
      CREATE ACCESS POLICY author_has_full_access
          ALLOW ALL USING ((.author ?= GLOBAL default::current_user));
      CREATE ACCESS POLICY others_read_only
          ALLOW SELECT ;
      CREATE REQUIRED PROPERTY text: std::str;
  };
};
