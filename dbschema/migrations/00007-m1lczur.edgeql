CREATE MIGRATION m1lczuriakffloagkb4vuc5qus6cdgc3ua6uaw72jxyg4bzxwljheq
    ONTO m1uecedtcf3ukrujyakpcwza45hofeyozico6vua7aaiy3tjgszioq
{
  ALTER TYPE default::Post {
      DROP ACCESS POLICY author_has_full_access;
  };
  ALTER TYPE default::Creatable {
      CREATE ACCESS POLICY author_has_full_access
          ALLOW ALL USING ((.author ?= GLOBAL default::current_user));
  };
  ALTER TYPE default::Post {
      DROP ACCESS POLICY others_read_only;
  };
  ALTER TYPE default::Creatable {
      CREATE ACCESS POLICY others_read_only
          ALLOW SELECT ;
  };
  ALTER TYPE default::Reaction {
      CREATE REQUIRED LINK post: default::Post {
          SET REQUIRED USING (<default::Post>{});
      };
  };
  CREATE TYPE default::Comment EXTENDING default::Reaction {
      CREATE REQUIRED PROPERTY text: std::str;
  };
};
