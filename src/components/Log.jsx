export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map(({ cell, player }) => (
        <li key={`${cell.row}${cell.col}`}>
          {player} selected {cell.row}, {cell.col}
        </li>
      ))}
    </ol>
  );
}
