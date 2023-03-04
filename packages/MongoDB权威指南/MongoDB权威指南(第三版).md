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

## 第三章 创建、更新和删除文档

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

- `$`定位运算符：只会更新第一个匹配到的数组元素

  ```ts
  // 案例1: 修改数组中指定字段的值
  {
    _id: 4,
    grades: [
       { grade: 80, mean: 75, std: 8 },
       { grade: 85, mean: 90, std: 5 },
       { grade: 90, mean: 85, std: 3 }
    ]
  }

  // 更新grade值为85的文档的std字段的值为6
  db.students.update(
     { _id: 4, "grades.grade": 85 },
     { $set: { "grades.$.std" : 6 } }
  )

  // 案例2: 只显示数组中某些元素
  { "_id" : 1, "semester" : 1, "grades" : [ 70, 87, 90 ] }
  { "_id" : 2, "semester" : 1, "grades" : [ 90, 90, 92 ] }
  { "_id" : 3, "semester" : 1, "grades" : [ 85, 100, 90 ] }
  db.students.find({
    semester: 1,
    grades: { $eq: 90 }
  },
  {
    "grades.$": 1
  })
  { "_id" : 1, "grades" : [ 90 ] }
  { "_id" : 2, "grades" : [ 90 ] } //注意这里显示的是该文档的第一个90
  { "_id" : 3, "grades" : [ 90 ] }

  // 案例3: 只更新查询到的第一个数组元素的值
  db.students.update({semester: 1, grades:90},{$set:{"grades.$":95}},
                     {multi:false} // 更新多条关闭，只更新第一个
                    );
  { "_id" : 1, "semester" : 1, "grades" : [ 70, 87, 95 ] } // 只更新了该条数据中的90 -> 95
  { "_id" : 2, "semester" : 1, "grades" : [ 90, 90, 92 ] }
  { "_id" : 3, "semester" : 1, "grades" : [ 85, 100, 90 ] }
  ```

  - `$[identifier]数组过滤器`：用于更新单个数组元素的选项`arrayFilters`，v mongodb 3.6.0+

  ```ts
  // 🌰案例一：所有>=100的元素全部修改为100
  [
    { "_id" : 1, "grades" : [ 95, 92, 90 ] },
    { "_id" : 2, "grades" : [ 98, 100, 102 ] },
    { "_id" : 3, "grades" : [ 95, 110, 100 ] }
  ]

  db.test.update({},
    { $set: { "grades.$[elem]":100 } }, // grades>=100的元素全部修改为100
    {
      multi:true,
      arrayFilters:[{"elem":{$gte:100}}]
    }
  )
  /*
    { "_id" : 1, "grades" : [95, 92, 90] },
    { "_id" : 2, "grades" : [98, 100, 100] },
    { "_id" : 3, "grades" : [95, 100, 100] }
  */





  // 🌰 案例2:
  // 1. 满足文档type为"quiz"的所有元素
  // 2. 满足question.source === 8的所有元素
  // 3. 满足以上两点的所有元素修改为0
  { "_id" : 1,
    "grades" : [
      { type: "quiz", questions: [ 10, 8, 5 ] },
      { type: "quiz", questions: [ 8, 9, 6 ] },
      { type: "hw", questions: [ 5, 8, 3 ] },
      { type: "exam", questions: [ 25, 10, 23, 0 ] },
    ]
  }
  db.student5.update({},
    // 满足grades.t.type: "quiz" && questions.source: 8
    {$set:{"grades.$[t].questions.$[score]":0}},
    // 这里的t相当于grades.t.type
    // source相当于 [...].questions.score: 8
    {arrayFilters:[{"t.type":"quiz"},{"score":8}]}
  );
  /*
  {
    "_id" : 1,
    "grades" : [
      { "type" : "quiz", "questions" : [10, 0, 5]},
      { "type" : "quiz", "questions" : [0, 9, 6]},
      { "type" : "hw", "questions" : [5, 8, 3]},
      { "type" : "exam", "questions" : [25, 10, 23, 0]}
    ]
  }
  */
  ```

## 第四章 查询

### 4.2.2 OR 查询

> 💡 虽然总是可以使用`"$or"`，但只要有可能就应该使用`"$in"`查询优化器可以更高效地对其进行处理

### 4.2.3 $not

- 匹配的结果取反

```ts
db.test.find({
  uname: {
    $not: { $eq: "xqv" }, // $not要配合其他操作符一起使用，如：等于$eq
  },
});
// 查询uname !== "xqv"的其他所有用户
```

### 4.3.1 $exists

- 辅助查询确认该键已存在

```ts
// 数据
{uname: "zs", talk: "你好啊"},
{uname: "空", talk: null}

// 🌰例子1：如果查询不存在的key，将会查到所有文档，因为所有文档确实不存在该key
db.test.find({ aka: null });
/*
	{uname: "zs", talk: "你好啊"},
	{uname: "空", talk: null}
*/


// 🌰例子2：如果只想要为null的数据，且不可以查出没有"talk"字段的文档，就必须用到$exists
db.test.find({
  talk: { $eq: null, $exists: true }
});
/*
	{uname: "空", talk: null}
*/
```

### 4.3.2 正则表达式

- $regex：正则匹配

```ts
// 查询name以x开头的所有
db.user.find({ name: /^x/ });

db.test.find({
  uname: { $regex: /^xqv.*/ },
});

// 正则表达式匹配正则表达式类型
db.foo.insertOne({ bar: /baz/ });
db.foo.find({ bar: /baz/ });
// { _id: ...,  bar : /baz/}
```

> 💡 当**使用区分大小写的正则表达式时可以走索引**，如果设置了`^`开头匹配将会在一次缩小索引匹配范围！

### 4.3.3 查询数组

- $all 操作符：数组内容`完全满足`指定的匹配条件，`元素顺序`不会影响

```ts
// $all的使用
db.users.find({
  badges:{
    $all:["black","blue"]
  }
}, { "_id":1, badges:1 });

// 等价于
db.users.find({
  $and:[
    {badges:"blue"},
    {badges:"black"}
  ]
}, { "_id":1, badges:1 });
// 查询结果：不考虑元素顺序，只要都包含就满足
{ "_id" : 1, "badges" : [ "blue", "black" ] }
{ "_id" : 6, "badges" : [ "black", "blue" ] }
```

- `$size`：返回满足 size 长度的数组的文档，但是无法与其他条件运算符一起使用(如：$gt)

```ts
db.collection.find({
  field: { $size: 2 },
});
```

- `$slice`：切割需要返回的数组字段，-1 最后一条，1 第一条，允许指定中间区间

```ts
// 获取倒数第一条
db.test.find(
  {},
  {
    comments: { $slice: -1 },
  }
);

// 第二条开始获取一条
db.test.find(
  {},
  {
    comments: { $slice: [1, 1] },
  }
);
```

- 数组范围查询的问题及解决方案

```ts
// 🌰例子：当字段即是数组又是数类型时
{"x" : 5}
{"x" : 15}
{"x" : 25}
{"x" : [5, 25]}
db.test.find({"x" : {"$gt" : 10, "$lt" : 20}})
/*
	{"x" : 15}
	{"x" : [5, 25]}
 */

// 解决方案一：使用$elemMatch查数组
// db.test.find({"x" : {"$elemMatch" : {"$gt" : 10, "$lt" : 20}}})
// 解决方案二：索引 + min() + max()查数字
// db.test.find({"x" : {"$gt" : 10, "$lt" : 20}}).min({"x" : 10}).max({"x" : 20})
// 解决方案三：不允许出现字段对应类型不一致的场景！👍
```

- 数组嵌套查询

```js
// 文档
"title" : "Raiders of the Lost Ark" ,
"filming locations" : [
    { "city": "Los Angeles", "state": "CA", "country": "USA" },
    { "city": "Rome", "state": "Lazio", "country": "Italy" },
    { "city": "Florence", "state": "sc", "country": "USA"}
]
db.user.find({ "from.city": "Rome" }) // ✅匹配[{..., city: "Rome",...}]的文档，允许多或少字段
db.user.find({ from: {city: "Rome"} }) // ❌只会匹配[{city: "Rome"}]的文档，多字段、少字段都匹配不到
```

> ⚠️ 上面数组嵌套查询，当查询为`find({ 条件1, 条件2 })`时，此时条件 = 条件 1 || 条件 2，如果我们想满足数组是，条件 = 条件 1 && 条件 2 时，需要使用`$elemMatch`操作符

- 查询数组元素满足多个条件

```js
// 数组中有一个元素满足即可
db.user.find({
  "from.city": "Rome",
  "from.country": "Italy",
});

// 数组中每个元素必须全部满足
db.user.find({
  $elemMatch: { city: "Rome", country: "Italy" },
});
```

### 4.4 $where

- $where：它允许你在查询中执行任意的 JS 代码。函数返回`true`，文档就作为结果集的一部分返回；如果函数返回`false`，文档就不返回

> ⚠️ 禁止终端用户随意使用`$where`子句

```ts
// 查询：role字段长度大于0 && role字段类型不是"字符串"类型的文档
db.users.find({
  $where: "this.role.length > 0 && typeof this.role !== 'string'",
});
```

- $where 比普通查询慢得多的原因

1. 每个文档都必须从 BSON 转换为 JS 对象，然后通过"$where"表达式计算

2. $where操作无法走索引，所以应该尽可能的先用条件查询走索引过滤，最后再用$where 对结果微调
3. 尽可能使用聚合操作符$expr运算符代替$where 操作符

### 4.5 游标

- 游标用法：只有在`next()`时才会查询获取前 100 个结果或者前 4MB 的数据（两者之中较小者），在所有数据耗尽之后才会再去查询是否有更多的数据

```ts
const cursor = db.collection.find();
while (cursor.hasNext()) {
  const doc = cursor.next();
  console.log(doc);
}
```

> 💡 应用程序中如果一定要用游标处理大数据分页场景，可以在内存中保存每个用户对应游标的 map 集合，这样游标查询内容就不会混乱；当然可以选择更好的用过滤条件去分页

### 4.5.1 limit、skip 和 sort

#### 排序

- `sort({})`: 根据字段排序，1 升序，-1 降序

```ts
db.users.find({}).sort({
  age: 1, // 先根据age字段升序排列
  name: -1, // age字段相同时，再按name字段降序排列
});
```

- 对于一个字段多种类型时，有一个预定义的排序顺序

```ts
1. 最小值
2. null
3. 数字（整型、长整型、双精度浮点型、小数型）
4. 字符串
5. 对象/文档
6. 数组
7. 二进制数据
8. ObjectId
9. Boolean
10. 日期
11. 时间戳
12. 正则表达式
13. 最大值
```

#### 分页

- `skip()`、`limit()`
- 分页提示: 当数据量大时，不要轻易使用 skip，skip 是查出来后一个一个跳过，最后获取结果

> 解决方案：在**查询阶段避免大数据量**，改为排序 ➕ 条件条件过滤
>
> （如：时间排序，time > 上一次最后时间 limit(n)）

```ts
// 使用skip
db.information.find({}).skip(100).limit(20);

// 在查询阶段避免读取大量数据
db.information
  .find({
    conversation_id: ObjectId("6397edc27d248ed52ee7750b"),
  })
  .sort({
    createdAt: -1,
  })
  .limit(20);
```

### 4.5.2 　避免略过大量结果

- 大数据分页场景：排序 ➕ 条件条件过滤

```ts
// 第一次：降序排列获取20条数据
db.users.find({}).limit(20).sort({ createAt: -1 });
// 后续：根据上一次最后一条数据的createAt字段作为条件，获取比它大的20条
const lastCreateAt = request.query.createAt;
db.users
  .find({ createAt: { $gt: lastCreateAt } })
  .limit(20)
  .sort({ createAt: -1 });
```

> 💡 只需确保有一个包含创建时间键的索引

- 获取随机文档场景：添加 random 字段

```ts
const randomNum = Math.random();
let res = db.users.findOne({ random: { $gt: randomNum } }); // 查询大于随机数值的第一个随机数，但有可能过大没有数据
if (res === null) {
  res = db.users.findOne({ random: { $lt: randomNum } });
}
return res;
```

> 💡 只需确保有一个包含随机键的索引

### 4.5.3 　游标生命周期

- 在服务器端，游标会占用内存和资源。一旦游标遍历完结果之后，或者客户端发送一条消息要求终止，数据库就可以释放它正在使用的资源。
- 还有一些情况可能导致游标终止以及随后的清理。当游标超出客户端的作用域时，驱动程序会向数据库发送一条特殊的消息，让数据库知道它可以“杀死”该游标。最后，即使用户没有遍历完所有结果而且游标仍在作用域内，如果 10 分钟没有被使用的话，数据库游标也将自动“销毁”。这样，如果客户端崩溃或者出错，MongoDB 就不需要维护上千个被打开的游标了。
- 有时可能的确需要一个游标维持很长时间。在这种情况下。注意：如果关闭了游标超时，则必须遍历完所有结果或主动将其销毁以确保游标被关闭。否则，它会一直占用数据库的资源，直到服务器重新启动。
