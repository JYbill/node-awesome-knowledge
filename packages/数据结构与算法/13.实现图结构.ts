/**
 * @Description: 图数据结构
 * @Author: 小钦var
 * @Date: 2023/3/18 18:36
 */
export default class Graph<T> {
  private vertex: T[] = []; // 顶点
  private edges: Map<T, T[]> = new Map(); // 邻接表：边

  /**
   * 判断顶点是否存在
   * @param vertex
   */
  existVertex(vertex: T): boolean {
    return this.vertex.includes(vertex);
  }

  /**
   * 添加顶点
   * @param vertex
   */
  addVertex(vertex: T) {
    this.vertex.push(vertex);
    this.edges.set(vertex, []);
  }

  /**
   * 添加边
   * @param v1
   * @param v2
   */
  addEdges(v1: T, v2: T) {
    if (!this.existVertex(v1) || !this.existVertex(v2)) {
      throw new Error(`${v1} or ${v2} 顶点不存在！`);
    }
    this.edges.get(v1)!.push(v2);
    this.edges.get(v2)!.push(v1);
  }

  /**
   * 遍历
   */
  traverse() {
    console.log("遍历图结构：");
    console.log(this.edges);
    for (const [key, value] of this.edges.entries()) {
      console.log(key, " -> ", value.join(" "));
    }
  }

  /**
   * 广度优先（一层一层的访问）
   * ```
   *              A
   *          B       C
   *       D    E
   *
   * 广度优先：A -> B -> C -> D -> E
   * 思路：
   *  队列：根据先进先出的特性，我们可以按照一层一层的顺序去遍历
   *  Set：根据set集合的不可重复特性，可以把edges边内重复的顶点去除
   *  1. 先获取第一个顶点放入队列中
   *  2. while循环直到queue队列中不再有任何顶点元素
   *  3. 循环内出队顶点元素，并添加如set集合，证明访问过该元素，并获取该顶点边上的其他顶点，插入队列中
   *  4. 可能该元素没有边，没有就跳过，继续出队顶点元素
   * ```
   */
  bfs() {
    if (this.vertex.length <= 0) return;

    const queue = [];
    const visitor = new Set<T>();
    visitor.add(this.vertex[0]);
    queue.push(this.vertex[0]); // 顶点插入队列中

    while (queue.length) {
      const vertex = queue.shift() as T;
      console.log(vertex); // 遍历

      const neighbors = this.edges.get(vertex) as T[];
      if (neighbors.length === 0) continue;
      // 不存在边直接跳过；顶点不存在表明该图结构里面就一个顶点
      for (const neighbor of neighbors) {
        if (!visitor.has(neighbor)) {
          visitor.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }

  /**
   * 深度搜索（一条路走到头，碰到头了再回头）
   * ```
   *              A
   *          B       C
   *       D    E
   * 深度搜索顺序：A -> B -> D -> E -> C
   * 思路：
   *  栈：先进后出的特点，走到头再开始出栈
   *  Set：不重复特性
   *  1. 顶点栈
   *  2. while栈存在元素，开始弹栈，弹出的元素如果有边相连的顶点，将所有顶点逆序入栈（顺序会导致遍历顺序相反）
   * ```
   */
  dfs() {
    if (this.vertex.length === 0) return;

    const visitors = new Set<T>();
    const stack: T[] = [];
    stack.push(this.vertex[0]);
    visitors.add(this.vertex[0]);

    while (stack.length) {
      const vertex = stack.pop() as T;
      console.log(vertex);

      const neighbors = this.edges.get(vertex) as T[];
      if (neighbors.length === 0) continue; // 如果该顶点没有边，直接跳过开始下一次出栈

      // 循环边的顶点
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const neighbor = neighbors[i];
        // 如果set集合中存在说明访问过，直接跳过，没访问过的入栈
        if (!visitors.has(neighbor)) {
          visitors.add(neighbor);
          stack.push(neighbor);
        }
      }
    }
  }
}

function main() {
  const graph = new Graph<string>();
  /* 添加顶点、边 */
  graph.addVertex("A");
  graph.addVertex("B");
  graph.addVertex("C");
  graph.addVertex("D");
  graph.addVertex("E");
  graph.addVertex("F");
  graph.addVertex("G");
  graph.addVertex("H");
  graph.addVertex("I");

  graph.addEdges("A", "B");
  graph.addEdges("A", "C");
  graph.addEdges("A", "D");
  graph.addEdges("C", "D");
  graph.addEdges("C", "G");
  graph.addEdges("D", "G");
  graph.addEdges("D", "H");
  graph.addEdges("E", "B");
  graph.addEdges("E", "I");
  graph.addEdges("F", "B");
  // graph.traverse();

  /* 广度遍历 */
  graph.bfs();

  /* 深度遍历 */
  // graph.dfs();
}

main();
