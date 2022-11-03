/**
 * @file: 1-流式导出测试.js
 * @author: xiaoqinvar
 * @desc: 流式导出样式不生效问题
 * @date: 2022-11-03 20:09:40
 */
const Excel = require("exceljs");
const { createReadStream, createWriteStream } = require("fs");
const { resolve } = require("path");

(async () => {
  const testWriteStream = createWriteStream(resolve(__dirname, "1-test.xlsx"));
  testWriteStream.on("close", () => {
    console.log("close event.");
  });

  const workbook = new Excel.stream.xlsx.WorkbookWriter({
    stream: testWriteStream,
    useStyles: true, // ⚠️ 一定要加上该参数，应用样式！！！
  });
  const ws = workbook.addWorksheet("Test Sheet");

  // 第一行
  const row = ws.addRow({ id: 1, name: "xiaoqinvar", dob: new Date() });
  row.font = {
    name: "Comic Sans MS",
    family: 4,
    size: 16,
    underline: true,
    bold: true,
  };
  ws.getCell("A1").value = "hello exceljs";
  ws.commit();
  await workbook.commit();
})();

/* // 列
liveSheet.columns = [
  {
    header: "userId",
    key: "userId",
    width: 50,
  },
  {
    header: "phone",
    key: "phone",
    width: 30,
  },
  {
    header: "time",
    key: "time",
    width: 30,
  },
];

const idCol = liveSheet.getColumn("userId");
idCol.alignment = { vertical: "middle", horizontal: "center" };
const dobCol = liveSheet.getColumn("phone");
dobCol.alignment = { vertical: "middle", horizontal: "center" };
const timeCol = liveSheet.getColumn("time");
timeCol.alignment = { vertical: "middle", horizontal: "center" };
const headerCell = liveSheet.getCell("A1");
headerCell.value = "哈哈哈哈哈哈";
headerCell.font = {
  size: 20,
  bold: true,
};
// 合并单元格
liveSheet.mergeCells("A1:D1");
liveSheet.getCell("A1").alignment = { vertical: "middle", horizontal: "center" };
// 设置标题
const titleRow = liveSheet.getRow(2);
titleRow.font = {
  size: 14,
};
titleRow.getCell("userId").value = "用户ID";
titleRow.getCell("phone").value = "手机号";
titleRow.getCell("time").value = "观看时长"; */
