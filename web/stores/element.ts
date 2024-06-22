export const useElementStore = defineStore("elementStore", {
  state: () => ({
    navigation: [
      {
        title: "Home",
        link: "/",
        icon: "mdi-send",
      },
      {
        title: "About me",
        link: "/about-me",
        icon: "mdi-alert-octagon",
      },
      {
        title: "Resume",
        link: "/resume",
        icon: "mdi-delete",
      },
    ] as any[],
  }),
  actions: {
    getRandomElements(array: any[], n: number): any[] {
      const shuffled = array.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
    },
    getRandomElement(array: any): any {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    },
    capitalizeName(name: string): string {
      const mots = name.split(" ");
      const motsFormattes = mots.map(
        (mot) => mot.charAt(0).toUpperCase() + mot.slice(1)
      );
      motsFormattes.shift();
      const resultat = motsFormattes.join(" ");
      return resultat;
    },
    separateName(name: string): string {
      const mots = name.split("-");
      return mots.join(" ");
    },
  },
});
