# MongoDB 权威指南(第三版)

## 第二章 入门指南

### 文档

1. 键中不能含有`\0`（空字符）。这个字符用于表示一个键的结束
2. `.`和`$`是特殊字符，只能在某些特定情况下使用(可以认为这两个字符属于保留字符)
3. 字段区分大小写，且不允许重复

```ts
// 下面两个文档是不同的
{"count" : 5}
{"Count" : 5}
// 重复不合法❌
{"greeting" : "Hello, world!", "greeting" : "Hello, MongoDB!"}
```

### 集合

集合：相当于关系型数据库的表

1. 集合名称不能是空字符串("")、空字符(\0)
2. 集合名称不能以`system.`开头，该前缀是为内部集合保留的。

> 🌰 例如，`system.users`集合中保存着数据库的用户，`system.namespaces`集合中保存着有关数据库所有集合的信息

3. 用户创建的集合名称中不应包含保留字符`$`

> 🌰 某些由系统生成的集合会包含它，除非你要访问的是这些集合之一，否则不应在名称中使用`$`字符

### 名称空间

- `名称空间`：将数据库名称与其中的集合名连起来，可以获得一个完全限定的集合名称

```ts
// 如果你要使用cms数据库中的blog.posts集合
// 则该集合的命名空间为：
cms.blog.posts;
```

> 💡 命名空间的长度限制为 120 字节，而实际使用时应该小于 100 字节

### shell

- shell：是一个 JavaScript 解释器，能够运行任意的 JavaScript 程序

```ts
Math.sin(Math.PI / 2); // 1
"hello mongodb!".repeat(2); // hello mongodb!hello mongodb!
```

- 定义方法

```ts
function double(num) {
  return num ** 2;
}
double(10); // 100
```

### 基本数据类型

1. null

2. boolean

3. 数值类型

   1. `浮点数`：默认使用 64 位浮点数来表示数值

   ```ts
   {"x" : 3.14}
   {"x" : 3}
   ```

   2. 对于整数：可以使用`NumberInt`或`NumberLong`类，它们分别表示 4 字节和 8 字节的有符号整数

   ```ts
   {"x" : NumberInt("3")} // 4字节大小整数，3
   {"x" : NumberLong("3")} // 8字节大小整数，3
   ```

4. 字符串：UTF8 字符串

5. 日期类型：存储为 64 位整数，表示自 Unix 纪元（1970 年 1 月 1 日）以来的`毫秒数`，不包含时区信息

6. 正则表达式：与 JS 的正则表达式语法相同

```ts
{"x" : /foobar/i}
```

7. 数组
8. 内嵌文档/对象

```ts
{
  "x" : {
    "foo" : "bar"
  }
}
```

9. ObjectID：是一个 12 字节的 ID，是文档的唯一标识

```ts
{"x": ObjectId()}
// {"x": ObjectId("636cd7a9e5a4c73cfd0eaee7")}
// 用24个十六进制数字组成的字符串来表示，每2个数字占1个字节，总共大小为12字节

// ObjectId生成原理
1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |  10  |  11  |  12  ｜
          时间戳      |           随机值             | 计数器（起始值随机）
// [1, 4]字节的时间戳和[5, 9]随机值为1s内提供了唯一性
// [1, 4]字节的时间戳隐含了文档创建时间
// 最后三字节：是一个计数器，以一个随机数作为起始值，用来避免分布式主键冲突问题
```

10. 二进制：是任意字节的字符串，不能通过 shell 操作；如果要将非 UTF-8 字符串存入数据库，那么使用二进制数据是唯一的方法。
11. 代码：存储 JS 代码

```ts
{"x" : function() { /* ... */ }}
```

### 增删改查

- 插入

```ts
// 插入数据
db.集合.insertOne({"key": "value"});
db.集合.insertMany([{}, {}, ...], { ordered: true}); // 默认为true

// ordered参数
// 为false时，允许MongoDB重新排列插入的顺序以提高性能，如果插入发生错误，会尝试插入所有文档
// 默认true时，按顺序插入，如果插入发生错误，之后的文档均不会被插入集合中
db.test.insertMany([
  {_id: 1, uname: "xqv", age: 24, job: "nodejs", workAge: 2},
  {_id: 1, uname: "张三", age: 20, job: "前端开发", workAge: 0},
  {_id: 2, uname: "小青蛙", age: 24, job: "nodejs全栈", workAge: 1},
], { ordered: false });
// 第1、3条会成功插入
```

- 删除

```js
db.collection.deleteOne(query); // 删除第一个满足条件的内容
db.collection.deleteMany(query); // 删除所有满足条件的内容

// 删除当前集合下的所有文档
db.collection.deleteMany({});
```

- 更新

> ⚠️ `更新文档是原子操作`：如果两个更新同时发生，先到达服务器的更新会先被执行，再执行下一个更新

```js
db.collection.replaceOne(query, replaceQuery); // 适合指定文档覆盖，允许修改_id但不推荐
db.test.replaceOne({ _id: 1 }, { name: "replaceOne" });
// {_id: 1, uname: "xqv", age: 24, job: "nodejs", workAge: 2}
// {_id: 1, name: "replaceOne"}

db.collection.updateOne(query, updateQuery, [options]);
db.collection.updateMany(query, updateQuery, [options]);
// upsert?: 默认false，不存在query数据是否插入updateQuery数据
```

> ⚠️ updateOne、updateMany 更新、删除必须使用$操作符，否则报错

- `$set: {field: value}`如果存在即更新，不存则添加
- `$unset: {field: 1}`删除该 field 字段，不存在忽略，存在删除该字段

```ts
db.test.updateOne({ _id: 3 }, { $set: { family: { son: "his son." } } });
db.test.updateOne({ _id: 3 }, { $set: { "family.son": "test." } }); // 嵌套写法
db.test.updateOne({ _id: 3 }, { $unset: { family: 1 } });
```

- `$inc: {field: 1}`：不存在的字段会创建，指定数字类型字段自增 1，再因为原子性所以适合强一致的自增，场景：投票、预览数

```ts
db.test.updateOne({ _id: 3 }, { $inc: { age: 1 } });
// {_id: 3, uname: "张三", age: 20, job: "前端开发", workAge: 0},
// {_id: 3, uname: "张三", age: 21, job: "前端开发", workAge: 0},
```

> ⚠️ `"$inc"` 只能用于`整型NumberInt`、`长整型NumberLong`或`双精度浮点型(默认数字)`的值，其他类型都会错误

### 数组操作

#### $pull/$push/...

- $push：存在字段，向数组末尾添加元素；不存在，创建数组并添加
  - `$each`修饰符：在一次操作中添加多个值
  - `$slice`修饰符：防止数组字段增长超过某个大小，超出像队列一样先进先出（配合$each 修饰符使用）
  - `$sort`修饰符：对数组中的所有元素排序，1 升序，-1 降序（配合$each 修饰符使用）

```ts
// {_id: 3, uname: "张三", age: 20, job: "前端开发", workAge: 0},

db.test.updateOne({ _id: 3 }, { $push: { color: "orange" } });
// {_id: 3, ..., color: ["orange"]},

db.test.updateOne({ _id: 3 }, { $push: { color: "red" } });
// {_id: 3, ..., color: ["orange", "red"]},

// 使用$each、$slice修饰符。超出后按照先进先出，最先移除"orange"
db.test.updateOne(
  { _id: 3 },
  {
    $push: {
      color: { $each: ["black", "white"], $slice: -3 },
    },
  }
);
// {_id: 3, ..., color: ["red", "black", "white"]},

// $each、$slice、$sort对排序后的结果进行切割限制
// { _id: 3, color: [{source: 1}, {source: 2}] }
db.test.updateOne(
  { _id: 3 },
  {
    $push: {
      color: {
        $each: [{ source: 3 }, { source: 4 }], // 插入3、4
        $slice: -3, // 限制只能有三个，先进先出
        $sort: { source: -1 }, // 对所有值先降序排列 -> 切割 -> 插入
      },
    },
  }
);
// { _id: 3, color: [{source: 3}, {source: 2}, {source: 1}]}
```

- $pull: 删除数组中指定的元素，如果有多个则删除数组中所有相同的指定元素

  ```js
  this.#Live.updateOne(
    {
      _id: "id",
    },
    {
      $pull: { playList: "id" },
    }
  );
  ```

- $pop：从任意一端删除元素

```ts
// {"todo" : ["dishes", "laundry", "dry cleaning"]}
db.lists.updateOne({}, { $pop: { todo: 1 } }); // 末尾删除一个元素
db.lists.updateOne({}, { $pop: { todo: -1 } }); // 头部删除一个元素
```

- $addToSet:向数组字段中添加之前不存在的元素
  - `$each`修饰符：在一次操作中添加多个元素，重复的元素不会追加

```ts
{
  $addToSet: {
    arrayField: value,
  }
}
```

- $pushAll: 新增多个对象到数组底部
- $pullAll: 在数组中删除匹配到所有值

#### $定位运算符

- 基于数组索引更改

```ts
db.test.updateOne(
  { _id: ObjectId("64001e0f3714e80566cdf216") },
  { $set: { "comments.0.uname": "基于下标更改" } }
);
```
