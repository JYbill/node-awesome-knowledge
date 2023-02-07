/**
 * @Description: 警告一小时内使用相同员工卡大于等于三次的人 ❌ 未完成
 * @Author: 小钦var
 * @Date: 2023/2/7 15:35
 */
function alertNames(keyName: string[], keyTime: string[]): string[] {
  const nameMap: Record<string, number[]> = {};
  for (let i = 0; i < keyName.length; i++) {
    const name = keyName[i];
    const [hour, minute] = keyTime[i].split(":");
    const totalMinute = parseInt(hour) * 60 + parseInt(minute);
    if (!nameMap[name]) {
      nameMap[name] = [totalMinute];
    } else {
      nameMap[name].push(totalMinute);
    }
  }

  const res: string[] = [];
  for (const key in nameMap) {
    const timeArr = nameMap[key];
    let count = 1;
    for (let i = 1; i < timeArr.length; i++) {
      const before = timeArr[i - 1];
      const current = timeArr[i];
      console.log(key, before, current, current - before);
      if (current - before <= 60 && current - before >= 0) {
        count += 1;
      }
      if (count >= 3) {
        res.push(key);
        break;
      }
    }
  }
  return res.sort();
}

// 测试
function test() {
  // 用例1
  let keyName = ["daniel", "daniel", "daniel", "luis", "luis", "luis", "luis"];
  let keyTime = ["10:00", "10:40", "11:00", "09:00", "11:00", "13:00", "15:00"];
  let warningNames = alertNames(keyName, keyTime); // ["daniel"]
  console.log(warningNames);

  keyName = ["alice", "alice", "alice", "bob", "bob", "bob", "bob"];
  keyTime = ["12:01", "12:00", "18:00", "21:00", "21:20", "21:30", "23:00"];
  warningNames = alertNames(keyName, keyTime); // ["bob"]
  console.log(warningNames);

  keyName = ["john", "john", "john"];
  keyTime = ["23:58", "23:59", "00:01"];
  warningNames = alertNames(keyName, keyTime); // []
  console.log(warningNames);

  keyName = ["leslie", "leslie", "leslie", "clare", "clare", "clare", "clare"];
  keyTime = ["13:00", "13:20", "14:00", "18:00", "18:51", "19:30", "19:49"];
  warningNames = alertNames(keyName, keyTime); // ["clare","leslie"]
  console.log(warningNames);

  keyName = ["a", "a", "a", "a", "a", "a", "b", "b", "b", "b", "b"];
  keyTime = [
    "23:27",
    "03:14",
    "12:57",
    "13:35",
    "13:18",
    "21:58",
    "22:39",
    "10:49",
    "19:37",
    "14:14",
    "10:41",
  ];
  warningNames = alertNames(keyName, keyTime); // ["a"]
  console.log(warningNames);
}

test();
