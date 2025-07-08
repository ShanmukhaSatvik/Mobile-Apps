import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int m = Integer.parseInt(br.readLine().trim());
        int k = Integer.parseInt(br.readLine().trim());
        long ans = Outcome.solve(m, k);
        System.out.println(ans);
    }
}
class Outcome {
    public static long solve(int m, int k) {
        List<Long> pk = new ArrayList<>();
        PriorityQueue<DayNode> pq = new PriorityQueue<>(Comparator.comparingLong(a->a.currentMarginal));
        long cur = 1;
        for (int d = 0; d <= 60; d++) {
            pk.add(cur);
            if ((long) k * cur > 1e18) break; 
            cur *= k;
        }
        pq.add(new DayNode(0, 0, 0L));
        long cost = 0;
        for (int bought = 0; bought < m; bought++) {
            DayNode node = pq.poll();
            cost += node.currentMarginal;
            int T1 = node.ticketsBought + 1;
            int d = node.day;
            long priceFactor = pk.get(d);
            long nextMarginal = priceFactor * (long) (T1 + 1) * (T1 + 1);
            pq.add(new DayNode(d, T1, nextMarginal));
            if (node.ticketsBought == 0 && d + 1 < pk.size()) {
                long fn = pk.get(d + 1);
                pq.add(new DayNode(d + 1, 0, fn));
            }
        }
        return cost;
    }
}
class DayNode {
    int day;
    int ticketsBought;
    long currentMarginal;
    DayNode(int day, int ticketsBought, long currentMarginal) {
        this.day = day;
        this.ticketsBought = ticketsBought;
        this.currentMarginal = currentMarginal;
    }
}