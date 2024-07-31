CREATE MIGRATION m1iezcjwvxwokjp6dhptcp55uz2wsttxfveeohxhtkduxyacjvzwzq
    ONTO m1krjkumrgjldxjamnamyvz4udrpvr42rfwpvye7vyho2ezs44nwaa
{
  ALTER GLOBAL default::current_user USING (GLOBAL ext::auth::ClientTokenIdentity);
};
