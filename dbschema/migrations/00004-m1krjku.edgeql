CREATE MIGRATION m1krjkumrgjldxjamnamyvz4udrpvr42rfwpvye7vyho2ezs44nwaa
    ONTO m1sfdwitpm5b2fwgbqsjwb4abspulzpsqmnojdl45dddecrtu2an6a
{
  CREATE TYPE default::Post {
      CREATE REQUIRED LINK author: ext::auth::Identity;
      CREATE ACCESS POLICY author_has_full_access
          ALLOW ALL USING ((.author ?= GLOBAL default::current_user));
      CREATE ACCESS POLICY others_read_only
          ALLOW SELECT ;
      CREATE REQUIRED PROPERTY text: std::str;
  };
};
