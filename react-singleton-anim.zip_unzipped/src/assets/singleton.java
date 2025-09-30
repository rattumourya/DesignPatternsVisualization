public class Singleton {
    private static volatile Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {                 // [1] first check
            synchronized (Singleton.class) {    // [2] lock
                if (instance == null) {         // [3] second check
                    instance = new Singleton(); // [4] create
                }
            }
        }
        return instance;                         // [5] return
    }
}
