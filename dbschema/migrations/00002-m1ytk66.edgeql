CREATE MIGRATION m1ytk66yxcuokc2i2ddbkarlwudfyscmb6r75fs5nda43cd7awwe3a
    ONTO m147v7wr6i67qvv6zevtwbtayt2khla2uxt4wbp273cywnv4ecizwq
{
  ALTER GLOBAL default::current_user USING (GLOBAL ext::auth::ClientTokenIdentity);
  CREATE ABSTRACT TYPE default::Creatable {
      CREATE PROPERTY created_at: std::datetime {
          SET default := (SELECT
              std::datetime_current()
          );
      };
  };
  ALTER TYPE default::Post {
      DROP ACCESS POLICY author_has_full_access;
  };
  ALTER TYPE default::Post {
      DROP LINK author;
  };
  ALTER TYPE default::Creatable {
      CREATE REQUIRED LINK author: ext::auth::Identity;
      CREATE ACCESS POLICY author_has_full_access
          ALLOW ALL USING ((.author ?= GLOBAL default::current_user));
  };
  ALTER TYPE default::Post {
      DROP ACCESS POLICY others_read_only;
  };
  ALTER TYPE default::Post {
      CREATE LINK author: ext::auth::Identity {
          SET REQUIRED USING (<ext::auth::Identity>{});
      };
      EXTENDING default::Creatable LAST;
  };
  CREATE ABSTRACT TYPE default::Reaction EXTENDING default::Creatable {
      CREATE REQUIRED LINK post: default::Post;
  };
  CREATE TYPE default::AngryFace EXTENDING default::Reaction;
  ALTER TYPE default::Creatable {
      CREATE ACCESS POLICY others_read_only
          ALLOW SELECT ;
  };
  CREATE TYPE default::Comment EXTENDING default::Reaction {
      CREATE REQUIRED PROPERTY text: std::str;
  };
  CREATE TYPE default::Dislike EXTENDING default::Reaction;
  ALTER TYPE default::Post {
      ALTER LINK author {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  DROP TYPE default::User;
};
