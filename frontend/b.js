/**
- `queryData` 传入参数为原始数据（数组格式，每个元素都是对象）
- 通过进行链式调用对数据执行操作，支持的方法有
  - `where(predicate)`: 根据参数的条件进行筛选，参数与 `[].filter` 的参数类似
  - `orderBy(key, desc)`: 根据 `key` 的值进行排列，默认升序排列，当第二个参数为 `true` 时降序排列
  - `execute()`: 执行所有处理并返回最终结果
- 执行 `execute` 方法时才真正执行操作并返回结果

例如：
queryData(data)
	.where(item => item.age > 18)
  .orderBy('age')
  .execute();
结果返回
[
  { name: 'baz', age: 19, city: 'hangzhou' },
  { name: 'fiz', age: 22, city: 'shanghai' },
  { name: 'bar', age: 24, city: 'hangzhou' }
];

例如：
queryData(data)
	.orderBy('age')
	.where(item => item.age > 18)
  .execute();
结果返回
[
  { name: 'baz', age: 19, city: 'hangzhou' },
  { name: 'fiz', age: 22, city: 'shanghai' },
  { name: 'bar', age: 24, city: 'hangzhou' }
];
**/

const data = [
  { name: 'foo', age: 16, city: 'shanghai' },
  { name: 'bar', age: 24, city: 'hangzhou' },
  { name: 'fiz', age: 22, city: 'shanghai' },
  { name: 'baz', age: 19, city: 'hangzhou' },
];

function queryData(data) {
  // todo 实现
  this.result = data;

  this.orderBy = (key, desc) => {
    const result = [...this.result];
    this.result = result.sort((a, b) => (desc ? 1 : -1));
    return this;
  };

  this.where = predicate => {
    const result = [...this.result];
    this.result = result.filter(predicate);
    return this;
  };

  this.execute = () => {
    return this.result;
  };

  return this;
}

const data1 = queryData(data)
  .orderBy('age')
  .where(item => item.age > 18)
  .execute();

console.log(data1);
