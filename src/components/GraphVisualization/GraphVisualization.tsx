import React, { useMemo } from 'react';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';
import type { Film, Starship } from '../../types';

interface GraphVisualizationProps {
  films: Film[];        // очікується Film з полем title і url або id + масивом film.starships (рядки з id або url)
  starships: Starship[]; // очікується Starship з полем name і url або id
  name: string;
}

const getId = (maybeUrlOrId: string) => {
  // підтримка і '3', і '/starships/3/' і 'https://.../starships/3/'
  const parts = String(maybeUrlOrId).split('/').filter(Boolean);
  const last = parts[parts.length - 1];
  return last ?? String(maybeUrlOrId);
};

const GraphVisualization: React.FC<GraphVisualizationProps> = ({ films, starships, name }) => {
  // мапа starshipId -> об’єкт корабля
  const starshipById = useMemo(() => {
    const map = new Map<string, Starship>();
    for (const s of starships) {
      const id = getId((s as any).url ?? (s as any).id ?? '');
      if (id) map.set(id, s);
    }
    return map;
  }, [starships]);

  // побудова вузлів та ребер
  const { nodes, edges } = useMemo(() => {
    const nodes: any[] = [];
    const edges: any[] = [];

    const heroX = 600;
    const heroY = 40;
    const levelGapY = 140;
    const filmGapX = 240;
    const shipGapY = 90;

    // 1) Герой (root)
    nodes.push({
      id: 'hero',
      data: { label: name },
      position: { x: heroX, y: heroY },
      style: { padding: 10, borderRadius: 8, border: '1px solid #999', background: '#fff' }
    });

    // 2) Фільми (2-й рівень)
    // Розкладаємо фільми в ряд з центру
    const filmY = heroY + levelGapY;
    const startX = heroX - ((films.length - 1) * filmGapX) / 2;

    films.forEach((film, index) => {
      const filmId = getId((film as any).url ?? (film as any).id ?? index.toString());
      const filmNodeId = `film-${filmId}`;
      const filmX = startX + index * filmGapX;

      nodes.push({
        id: filmNodeId,
        data: { label: film.title },
        position: { x: filmX, y: filmY },
        style: { padding: 8, borderRadius: 8, border: '1px solid #6aa9ff', background: '#f3f8ff' }
      });

      edges.push({
        id: `edge-hero-${filmNodeId}`,
        source: 'hero',
        target: filmNodeId,
        style: { stroke: '#6aa9ff' }
      });

      // 3) Кораблі (3-й рівень)
      // Беремо film.starships і перетинаємо зі списком кораблів героя (starshipById)
      const filmStarships: string[] = Array.isArray((film as any).starships) ? (film as any).starships : [];
      const shipIdsForFilm = filmStarships.map(getId).filter((id) => starshipById.has(id));

      shipIdsForFilm.forEach((shipId, sIndex) => {
        const ship = starshipById.get(shipId)!;
        const shipNodeId = `ship-${shipId}-for-${filmId}`;
        const shipY = filmY + levelGapY + sIndex * shipGapY;
        const shipX = filmX; // під фільмом по тій самій X

        nodes.push({
          id: shipNodeId,
          data: { label: (ship as any).name ?? `Starship ${shipId}` },
          position: { x: shipX, y: shipY },
          style: { padding: 6, borderRadius: 8, border: '1px solid #ff8a8a', background: '#fff7f7' }
        });

        edges.push({
          id: `edge-${filmNodeId}-${shipNodeId}`,
          source: filmNodeId,
          target: shipNodeId,
          style: { stroke: '#ff8a8a' }
        });
      });
    });

    return { nodes, edges };
  }, [films, starshipById, name]);

  return (
    <div style={{ width: '100vw', height: '420px' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
};

export default GraphVisualization;
