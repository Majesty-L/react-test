import React, { useState, useEffect, createContext, useContext, useReducer, useMemo, useCallback } from 'react';
import { Radio } from 'antd';

const Timer = function ({ count, setCount }) {
  const displayCount = useMemo(() => count, [count]);
  return (
    <div>
      <h2>计数器练习</h2>
      {/* 一个基本的响应式，V->C->M */}
      <div>displayCount: {displayCount}</div>
      <button onClick={() => setCount((Number(count) || 0) + 1)}>+1</button>
    </div>
  );
};

const List = function ({ count }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(Array.from({ length: count }, (_, index) => ({ name: `person${index}`, age: Math.floor(Math.random() * 10) })));
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer); // 防抖
  }, [count]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>列表练习</h2>
      <p>列表内容根据count变化</p>
      {data.map((item, index) => (
        <div key={index}>
          {item.name} - {item.age} - 第{index + 1}行
        </div>
      ))}
    </div>
  )
};

const Input = function ({ count, setCount }) {
  return (
    <div>
      <h2>输入练习</h2>
      <p>输入内容变化会触发count变化</p>
      <input type="number" value={count} onChange={event => setCount(event.target.value)} placeholder="输入数字" />
    </div>
  )
};

// 为了传递props
const ThemeContext = createContext('click');
// 局部vuex
const reducer = (state, action) => ({ theme: action.type });

const ChangeContext = function ({ children }) {
  // 用reducer切换主题
  const [state, dispatch] = useReducer(reducer, { theme: 'click' });
  // 用useState切换主题
  // const [theme, setTheme] = useState('click');
  const changeTheme = useCallback((theme) => {
    // ！！不能用state中的theme，因为只在挂在时创建一次，无法拿到最新的theme
    dispatch({ type: theme === 'click' ? 'click' : 'input' });
    // setTheme(theme === 'click' ? 'input' : 'click');
  }, []);
  return (
    <ThemeContext.Provider value={{ theme: state.theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const ChangeWay = function ({ count, setCount }) {
  const { theme, changeTheme } = useContext(ThemeContext);
  return (
    <div>
      <Radio.Group
        value={theme}
        onChange={event => changeTheme(event.target.value)}
        options={[
          { value: 'click', label: '点击' },
          { value: 'input', label: '输入' },
        ]}
      />
      {theme === 'click' ? <Timer count={count} setCount={setCount} /> : <Input count={count} setCount={setCount} />}
    </div>
  )
};

const Main = function () {
  const [count, setCount] = useState(0);
  return (
    <div>
      <ChangeContext>
        <ChangeWay count={count} setCount={setCount} />
        <List count={count} />
      </ChangeContext>
    </div>
  );
};

export default Main;
