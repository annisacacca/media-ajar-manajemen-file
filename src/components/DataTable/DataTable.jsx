// src/components/DataTable/DataTable.jsx
// Tabel sederhana bergaya retro. columns = ['A','B'], rows = [['1','2'], ...]
import './DataTable.css'

export default function DataTable({ columns, rows, className = '' }) {
  return (
    <div className={`dtable ${className}`}>
      <table>
        <thead>
          <tr>{columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((cell, i) => (i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
