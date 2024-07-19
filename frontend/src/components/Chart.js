// frontend/src/components/Chart.js
import { Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <Bar
        data={{
          labels: data.labels,
          datasets: [{
            label: 'Insights',
            data: data.values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        }}
        options={{
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Insights'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Values'
              }
            }
          },
        }}
      />
    </div>
  );
};

export default Chart;
