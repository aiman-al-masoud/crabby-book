CREATE MIGRATION m1fap64w6b5a35747g7epoenkjaourh4t4tedjndttqr52rwndxq4q
    ONTO m1lczuriakffloagkb4vuc5qus6cdgc3ua6uaw72jxyg4bzxwljheq
{
  CREATE ALIAS default::Identity := (
      ext::auth::Identity
  );
};
