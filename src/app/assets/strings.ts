const trainStatsIcons = ["check", "archive-arrow-up", "arm-flex"]

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
      exercises: string;
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
      searchExercises: string;
    };
    models: {
      models: string;
      newModel: string;
      createModel: string;
      noTrainingModels: string;
      deleteModel: string;
      shareModel: string;
      trainingAnnotation: string;
      addExercise: string;
      saveModel: string;
      author: string;
      startTS: string;
      tSession: string;
      defaultName: string;
      confirmDelete: string;
      confirmCancelTS: string;
      oneTimeSession: string;
    };
    startTraining: string;
    finishTS: string;
    cancelTS: string;
    confirmShare: string;
  };
  history: {
    yourTH: string;
    noTS: string;
    deleteSession: string;
    confirmDeleteSession: string;
  };
  home: {
    home: string;
    completedATS: string;
    completedTheTS: string;
    sharedTM: string;
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
    stats: string;
    trainStats: string[];
    trainStatsIcons: string[];
  };
  yes: string;
  no: string;
  delete: string;
  edit: string;
  share: string;
  cancel: string;
  comment: string;
  media_error: string;
  deleteImage: string;
  confirmDeleteImage: string;
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
      exercises: "Exercises",
      muscle: "Muscle",
      primaryMuscle: "Primary Muscle",
      secondaryMuscles: "Secondary Muscles",
      category: "Category",
      any: "Any",
      noExercisesFound: "No Exercises found!",
      equipment: "Equipment",
      exerciseSelector: "Exercise Selector",
      exerciseAnnotation: "Add an annotation to the Exercise",
      set: "Set",
      weight: "Weight",
      distance: "Distance",
      duration: "Duration",
      addSet: "Add Set",
      repRange: "Rep. Range",
      reps: "Reps",
      time: "Time",
      goalTime: "Goal Time",
      times: "x",
      searchExercises: "Search Exercises"
    },
    models: {
      models: "Models",
      newModel: "New Training Model",
      createModel: "Start Training",
      noTrainingModels: "You have no Training Models",
      deleteModel: "Delete Model",
      shareModel: "Share Model",
      trainingAnnotation: "Training Description",
      addExercise: "Add Exercise",
      saveModel: "Save Training Model",
      author: "Author",
      startTS: "Start Training Session",
      tSession: "Training Session",
      defaultName: "Workout",
      confirmDelete: "Are you sure you want to delete the model?",
      oneTimeSession: "One time session?",
      confirmCancelTS:
        "Are you sure you want to cancel the training session?\nYour progress will be lost."
    },
    startTraining: "Start Training",
    finishTS: "Finish Training Session",
    cancelTS: "Cancel Training Session",
    confirmShare:
      "Do you want to share this training session with your followers?"
  },
  history: {
    yourTH: "Your Training History",
    noTS: "You haven't concluded any Training Sessions. Start Training and check your Training History here!",
    deleteSession: "Delete Session?",
    confirmDeleteSession: "Confirm?"
  },
  home: {
    home: "Home",
    completedATS: "Completed a training session",
    completedTheTS: "Completed the training session:",
    sharedTM: "Shared the training model:"
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
    unfollow: "Unfollow",
    stats: "Statistics",
    trainStats: [
      "Finished Training Sessions",
      "Training Models Created",
      "Saved Training Models"
    ],
    trainStatsIcons: trainStatsIcons
  },
  yes: "Yes",
  no: "No",
  delete: "Delete",
  edit: "Edit",
  share: "Share",
  cancel: "Cancel",
  comment: "Comment",
  media_error: "Error reading media.",
  deleteImage: "Delete Image",
  confirmDeleteImage: "Delete the specified image?"
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
      exercises: "Exercícios",
      muscle: "Músculo",
      primaryMuscle: "Músculo Principal",
      secondaryMuscles: "Músculos Secundários",
      category: "Categoria",
      any: "Qualquer",
      noExercisesFound: "Nenhum Exercício Encontrado!",
      equipment: "Equipamento",
      exerciseSelector: "Exercise Selector",
      exerciseAnnotation: "Adicione uma nota ao Exercício",
      set: "Série",
      weight: "Peso",
      distance: "Distância",
      duration: "Duração",
      addSet: "Adicionar Série",
      repRange: "Gama Reps.",
      reps: "Repetições",
      time: "Tempo",
      goalTime: "Objetivo de Tempo",
      times: "x",
      searchExercises: "Pesquisar Exercícios"
    },
    models: {
      models: "Modelos",
      newModel: "Novo Modelo de Treino",
      createModel: "Começar a Treinar",
      noTrainingModels: "Não existem Modelos de Treino",
      deleteModel: "Apagar Modelo",
      shareModel: "Partilhar Modelo",
      trainingAnnotation: "Descrição do Treino",
      addExercise: "Adicionar Exercício",
      saveModel: "Guardar Modelo de Treino",
      author: "Autor",
      startTS: "Começar Sessão de Treino",
      tSession: "Sessão de Treino",
      defaultName: "Treino",
      confirmDelete: "Tem a certeza de que quer eliminar o modelo?",
      oneTimeSession: "Sessão única?",
      confirmCancelTS:
        "Tem a certeza de que quer cancelar a sessão de treino?\nO seu progresso ´será perdido."
    },
    startTraining: "Começar a Treinar",
    finishTS: "Concluir Sessão de Treino",
    cancelTS: "Cancelar Sessão de Treino",
    confirmShare: "Quer partilhar a sessão de treino com os seus seguidores?"
  },
  history: {
    yourTH: "Histórico de Treinos",
    noTS: "Ainda não existem Sessões de Treino concluídas. Comece a Treinar e verifique o seu Histórico aqui!",
    deleteSession: "Eliminar Sessão",
    confirmDeleteSession: "Confirmar?"
  },
  home: {
    home: "Home",
    completedATS: "Completou uma Sessão de treino",
    completedTheTS: "Completou a Sessão de Treino:",
    sharedTM: "Partilhou o Modelo de Treino:"
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
    unfollow: "Deixar de Seguir",
    stats: "Estatísticas",
    trainStats: [
      "Treinos Completos",
      "Modelos de Treino Criados",
      "Modelos de Treino Guardados"
    ],
    trainStatsIcons: trainStatsIcons
  },
  yes: "Sim",
  no: "Não",
  delete: "Eliminar",
  edit: "Editar",
  share: "Partilhar",
  cancel: "Cancelar",
  comment: "Comentário",
  media_error: "Erro ao ler o conteúdo.",
  deleteImage: "Apagar Imagem",
  confirmDeleteImage: "Apagar a imagem selecionada"
}
