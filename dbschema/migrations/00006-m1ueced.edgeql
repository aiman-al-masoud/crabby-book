CREATE MIGRATION m1uecedtcf3ukrujyakpcwza45hofeyozico6vua7aaiy3tjgszioq
    ONTO m1iezcjwvxwokjp6dhptcp55uz2wsttxfveeohxhtkduxyacjvzwzq
{
  CREATE ABSTRACT TYPE default::Creatable {
      CREATE REQUIRED LINK author: ext::auth::Identity;
      CREATE PROPERTY created_at: std::datetime {
          SET default := (SELECT
              std::datetime_current()
          );
      };
  };
  CREATE ABSTRACT TYPE default::Reaction EXTENDING default::Creatable;
  CREATE TYPE default::AngryFace EXTENDING default::Reaction;
  CREATE TYPE default::Dislike EXTENDING default::Reaction;
  ALTER TYPE default::Post EXTENDING default::Creatable LAST;
  ALTER TYPE default::Post {
      ALTER LINK author {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  CREATE TYPE default::SadFace EXTENDING default::Reaction;
};
