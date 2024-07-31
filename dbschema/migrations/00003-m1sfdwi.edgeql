CREATE MIGRATION m1sfdwitpm5b2fwgbqsjwb4abspulzpsqmnojdl45dddecrtu2an6a
    ONTO m1ktl6hhvmrqip5cezvpbzikvrww4rglz7h46w6tvg5mkig5f7s5rq
{
  ALTER GLOBAL default::current_user USING (std::assert_single((SELECT
      ext::auth::Identity
  FILTER
      (ext::auth::Identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
  DROP TYPE default::Post;
  DROP TYPE default::User;
};
