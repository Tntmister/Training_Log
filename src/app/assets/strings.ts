export type strings = {
  auth: {
    signIn: string;
    signInWith: string;
    signUp: string;
    googleSignIn: string;
    forgotPassword: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAgreement: string;
    passwordsDoNotMatch: string;
    mustAgrreToTerms: string;
  };
  train: {
    exercises: {
      muscle: string;
      primaryMuscle: string;
      secondaryMuscles: string;
      category: string;
      any: string;
      noExercisesFound: string;
      equipment: string;
      exerciseSelector: string;
      exerciseAnnotation: string;
      set: string;
      weight: string;
      distance: string;
      duration: string;
      addSet: string;
      repRange: string;
      reps: string;
      time: string;
      goalTime: string;
      times: string;
    };
    models: {
      newModel: string;
      createModel: string;
      noTrainingModels: string;
      deleteModel: string;
      trainingAnnotation: string;
      addExercise: string;
      saveModel: string;
      author: string;
      startTS: string;
    };
    starEmptyTS: string;
    finishTS: string;
    cancelTS: string;
  };
  history: {
    yourTH: string;
    noTS: string;
    deleteSession: string;
    confirmDeleteSession: string;
  };
  home: {
    home: string;
  };
  user: {
    models: string;
    followers: string;
    following: string;
    startedIn: string;
    editProfile: string;
    name: string;
    email: string;
    bio: string;
    registered: string;
    logout: string;
    toggleTheme: string;
    posts: string;
    follow: string;
    unfollow: string;
  };
  yes: string;
  no: string;
};

export type strings_global_lang = {
  langs: {
    pt: string;
    en: string;
  };
};

export const strings_global: strings_global_lang = {
  langs: {
    pt: "Português",
    en: "English"
  }
}

export const strings_en: strings = {
  auth: {
    signIn: "Sign In",
    signInWith: "Or Sign In With",
    signUp: "Sign Up",
    googleSignIn: "Sign In With Google",
    forgotPassword: "Forgot Password?",
    username: "Username",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    termsAgreement: "I agree to the Terms of Use",
    passwordsDoNotMatch: "Passwords do not match!",
    mustAgrreToTerms: "You must agree to the Terms of Use."
  },
  train: {
    exercises: {
      muscle: "Muscle",
      primaryMuscle: "Primary Muscle",
      secondaryMuscles: "Secondary Muscles",
      category: "Category",
      any: "Any",
      noExercisesFound: "No Exercises found!",
      equipment: "Equipment",
      exerciseSelector: "Exercise Selector",
      exerciseAnnotation: "Exercise Annotation",
      set: "Set",
      weight: "Weight",
      distance: "Distance",
      duration: "Duration",
      addSet: "Add Set",
      repRange: "Rep. Range",
      reps: "Reps",
      time: "Time",
      goalTime: "Goal Time",
      times: "x"
    },
    models: {
      newModel: "New Training Model",
      createModel: "Start Training",
      noTrainingModels: "You have no Training Models",
      deleteModel: "Delete Model",
      trainingAnnotation: "Training Annotation",
      addExercise: "Add Exercise",
      saveModel: "Save Training Model",
      author: "Author",
      startTS: "Start Training Session"
    },
    starEmptyTS: "Start empty Training Session",
    finishTS: "Finish Training Session",
    cancelTS: "Cancel Training Session"
  },
  history: {
    yourTH: "Your Training History",
    noTS: "You haven't concluded any Training Sessions. Start Training and check your Training History here!",
    deleteSession: "Delete Session?",
    confirmDeleteSession: "Confirm?"
  },
  home: {
    home: "Home"
  },
  user: {
    models: "Models",
    followers: "Followers",
    following: "Following",
    startedIn: "Started In",
    editProfile: "Edit Profile",
    name: "Name",
    email: "Email Adress",
    bio: "Bio",
    registered: "Registered",
    logout: "Log Out",
    toggleTheme: "Toggle Theme",
    posts: "Posts",
    follow: "Follow",
    unfollow: "Unfollow"
  },
  yes: "Yes",
  no: "No"
}

export const strings_pt: strings = {
  auth: {
    signIn: "Entrar",
    signInWith: "Entrar com",
    signUp: "Registar",
    googleSignIn: "Entrar com a Google",
    forgotPassword: "Esqueceu-se da Palavra-Passe?",
    username: "Username",
    email: "Email",
    password: "Palavra-Passe",
    confirmPassword: "Confirmar Palavra-Passe",
    termsAgreement: "Concordo com os Termos de Utilização",
    passwordsDoNotMatch: "As Palavras-Passe não coincidem!",
    mustAgrreToTerms: "É necessário concordar com os Termos de Utilização."
  },
  train: {
    exercises: {
      muscle: "Músculo",
      primaryMuscle: "Músculo Principal",
      secondaryMuscles: "Músculos Secundários",
      category: "Categoria",
      any: "Qualquer",
      noExercisesFound: "Nenhum Exercício Encontrado!",
      equipment: "Equipamento",
      exerciseSelector: "Exercise Selector",
      exerciseAnnotation: "Exercise Annotation",
      set: "Série",
      weight: "Peso",
      distance: "Distância",
      duration: "Duração",
      addSet: "Adicionar Série",
      repRange: "Gama Reps.",
      reps: "Repetições",
      time: "Tempo",
      goalTime: "Objetivo de Tempo",
      times: "x"
    },
    models: {
      newModel: "Novo Modelo de Treino",
      createModel: "Começar a Treinar",
      noTrainingModels: "Não existem Modelos de Treino",
      deleteModel: "Apagar Modelo",
      trainingAnnotation: "Nota do Treino",
      addExercise: "Adicionar Exercício",
      saveModel: "Guardar Modelo de Treino",
      author: "Autor",
      startTS: "Começar Sessão de Treino"
    },
    starEmptyTS: "Começar Seesão de treino Vazia",
    finishTS: "Concluir Sessão de Treino",
    cancelTS: "Cancelar Sessão de Treino"
  },
  history: {
    yourTH: "Histórico de Treinos",
    noTS: "Ainda não existem Sessões de Treino concluídas. Comece a Treinar e verifique o seu Histórico aqui!",
    deleteSession: "Eliminar Sessão",
    confirmDeleteSession: "Confirmar?"
  },
  home: {
    home: "Home"
  },
  user: {
    models: "Modelos",
    followers: "Seguidores",
    following: "A seguir",
    startedIn: "Started In",
    editProfile: "Editar Perfil",
    name: "Nome",
    email: "Email",
    bio: "Bio",
    registered: "Registado",
    logout: "Sair",
    toggleTheme: "Mudar Tema",
    posts: "Partilhas",
    follow: "Seguir",
    unfollow: "Deixar de Seguir"
  },
  yes: "Sim",
  no: "Não"
}
