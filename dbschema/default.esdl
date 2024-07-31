using extension auth;

module default {

  global current_user := global ext::auth::ClientTokenIdentity;

  abstract type Creatable{

    required author: ext::auth::Identity;

    created_at: datetime {
      default := (select datetime_current());
    }

    access policy author_has_full_access
      allow all
      using (.author ?= global current_user);

    access policy others_read_only
      allow select;
  }

  type Post extending Creatable{
    required text: str;
  }

  abstract type Reaction extending Creatable{
    required post: Post;
  }

  type Dislike extending Reaction{

  }

  type AngryFace extending Reaction{

  }

  type Comment extending Reaction{
    required text: str;
  }

}
