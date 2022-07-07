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
    invalidCredentials: string;
    nonEmptyUsername: string;
    weakPassword: string;
    invalidEmail: string;
    networkError: string;
    unknownUser: string;
    resetPasswordHeader: string;
    resetPasswordContent: (email: string) => string;
    permenentlyBanned: string;
    bannedUntil: (date: string) => string;
    confirmAccountHeader: string;
    confirmAccountContent: (email: string) => string;
    resendEmail: string;
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
      performedEx: string;
      daysAgo: string;
      estimated1RM: string;
      pace: string;
      progress_warning: string;
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
      editModel: string;
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
    timeFormat: string;
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
    reportPostHeader: string;
    reportPostContent: string;
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
    metric: string;
    imperial: string;
  };
  admin: {
    reportedBy: (user: string | undefined) => string;
    postedBy: (user: string | undefined) => string;
    reason: (reason: string | undefined) => string;
    deletePost: string;
    deletingPost: string;
    reportedPosts: string;
    banPrompt: (user: string | undefined) => string;
    banPlaceholder: string;
    week: string;
    permanent: string;
  };
  notification: {
    newPosts: string;
    newPostsContent: (num: number) => string;
  };
  yes: string;
  no: string;
  ok: string;
  delete: string;
  edit: string;
  share: string;
  cancel: string;
  comment: string;
  media_error: string;
  deleteImage: string;
  confirmDeleteImage: string;
  save: string;
  info: string;
  stats: string;
  timesSoFar: string;
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
    mustAgrreToTerms: "You must agree to the Terms of Use.",
    invalidCredentials: "Invalid Credentials",
    invalidEmail: "Email already in use",
    networkError: "Connection Error",
    nonEmptyUsername: "Username must not be empty",
    resetPasswordContent: (email: string): string =>
      `A password reset email has been send to "${email}"`,
    resetPasswordHeader: "Password Reset",
    unknownUser: "Unknown User",
    weakPassword: "Password must be at least 6 characters long",
    permenentlyBanned: "You are permanently banned",
    bannedUntil: (date) => `You are banned until ${date}`,
    confirmAccountContent: (email) =>
      `A confirmation email has been sent to ${email}.`,
    confirmAccountHeader: "Confirm Registration",
    resendEmail: "Resend Email"
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
      searchExercises: "Search Exercises",
      performedEx: "You've performed this exercise ",
      daysAgo: "Days ago",
      estimated1RM: "Estimated 1RM",
      progress_warning:
        "You havent't executed this exercise enough times to see progress. Execute it at least 2 times!",
      pace: "Average Pace"
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
      editModel: "Edit Model",
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
      "Do you want to share this training session with your followers?",
    timeFormat: "HH:MM:SS"
  },
  history: {
    yourTH: "Your Training History",
    noTS: "You haven't concluded any Training Sessions. Start Training and check your Training History here!",
    deleteSession: "Delete Session",
    confirmDeleteSession: "Confirm?"
  },
  home: {
    home: "Home",
    completedATS: "Completed a training session",
    completedTheTS: "Completed the training session:",
    sharedTM: "Shared the training model:",
    reportPostHeader: "Report Post",
    reportPostContent: "How do you think this post is inappropriate?"
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
    trainStatsIcons: trainStatsIcons,
    metric: "Metric",
    imperial: "Imperial"
  },
  admin: {
    banPrompt: (user) => `Should the user ${user} be banned?`,
    banPlaceholder: "Days (-1 = permanent)",
    deletePost: "Delete Post?",
    deletingPost: "Deleting Post",
    permanent: "Permanently",
    reportedPosts: "Reported Posts",
    postedBy: (user) => `Posted by ${user}`,
    reason: (reason) => `Reason: ${reason}`,
    reportedBy: (user) => `Reported by ${user}`,
    week: "1 Week"
  },
  notification: {
    newPosts: "New Training Posts From From Users You Follow!",
    newPostsContent: (num) =>
      `You have ${
        num > 10 ? "10+" : num
      } new unseen posts from users you follow!`
  },
  yes: "Yes",
  no: "No",
  ok: "Ok",
  delete: "Delete",
  edit: "Edit",
  share: "Share",
  cancel: "Cancel",
  comment: "Comment",
  media_error: "Error reading media.",
  deleteImage: "Delete Image",
  confirmDeleteImage: "Delete the specified image?",
  save: "Save",
  info: "Info",
  stats: "Statistics",
  timesSoFar: "times so far"
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
    mustAgrreToTerms: "É necessário concordar com os Termos de Utilização.",
    invalidCredentials: "Credenciais Inválidas",
    invalidEmail: "Email já em uso",
    networkError: "Erro Ligação",
    nonEmptyUsername: "Nome de utilizador não pode ser vazio",
    resetPasswordContent: (email: string): string =>
      `Um Email para repor a palavra-passe foi enviado para "${email}"`,
    resetPasswordHeader: "Report Palavra-Passe",
    unknownUser: "Utilizador Desconhecido",
    weakPassword: "Palavra-passe deve ter pelo menos 6 caracteres",
    bannedUntil: (date) => `Está banido até ${date}.`,
    confirmAccountContent: (email) =>
      `O email de confirmação foi enviado para ${email}.`,
    confirmAccountHeader: "Confirmar Registo",
    resendEmail: "Reenviar Email",
    permenentlyBanned: "Está banido permanentemente"
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
      searchExercises: "Pesquisar Exercícios",
      performedEx: "Já executou este exercício",
      daysAgo: "Dias atrás",
      estimated1RM: "1RM Estimado",
      progress_warning:
        "Ainda não executou o exercício vezes suficientes para ver o progresso. Execute-o pelo menos 2 vezes!",
      pace: "Ritmo Médio"
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
      editModel: "Editar Modelo",
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
    confirmShare: "Quer partilhar a sessão de treino com os seus seguidores?",
    timeFormat: "HH:MM:SS"
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
    sharedTM: "Partilhou o Modelo de Treino:",
    reportPostContent: "Como acha esta publicação inapropriada?",
    reportPostHeader: "Reportar Publicação"
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
    trainStatsIcons: trainStatsIcons,
    metric: "Métrico",
    imperial: "Imperial"
  },
  admin: {
    banPrompt: (user) => `O utilizador ${user} deve ser banido?`,
    banPlaceholder: "Dias (-1 = permanente)",
    deletePost: "Apagar publicação?",
    deletingPost: "A Apagar Publicação",
    reportedPosts: "Publicações Reportadas",
    permanent: "Permanentemente",
    postedBy: (user) => `Publicado por ${user}`,
    reason: (reason) => `Razão: ${reason}`,
    reportedBy: (user) => `Reportado por ${user}`,
    week: "1 Semana"
  },
  notification: {
    newPosts: "Novas publicações de treino de utilizadores que segue!",
    newPostsContent: (num) =>
      `Tem ${
        num > 10 ? "10+" : num
      } novas publicações de utilizadores que segue!`
  },
  yes: "Sim",
  no: "Não",
  ok: "Ok",
  delete: "Eliminar",
  edit: "Editar",
  share: "Partilhar",
  cancel: "Cancelar",
  comment: "Comentário",
  media_error: "Erro ao ler o conteúdo.",
  deleteImage: "Apagar Imagem",
  confirmDeleteImage: "Apagar a imagem selecionada",
  save: "Guardar",
  info: "Informação",
  stats: "Estatísticas",
  timesSoFar: "vezes"
}
