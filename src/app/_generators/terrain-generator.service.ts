import { Injectable } from "@angular/core";
import { RandomService } from "../_services/random.service";
import { SeafarersMap } from "../_models/SeafarersMap";
import { Terrain } from "../_models/Terrain";
import { ArrayService } from "../_services/array.service";
import { MapSettings } from "../_maps/MapSettings";

@Injectable({
    providedIn: "root",
})
export class TerrainGenerator {
    private randomService: RandomService;
    private arrayService: ArrayService;

    constructor(randomService: RandomService, arrayService: ArrayService) {
        this.randomService = randomService;
        this.arrayService = arrayService;
    }
    public generateTerrain(map: SeafarersMap, settings: MapSettings): SeafarersMap {
        const minimums: Terrain[] = this.getMinimumResources(settings);
        const minimumsCount: number = minimums.length;
        map = this.addTerrainsToMap(map, minimums, minimumsCount);
        const remaining: Terrain[] = this.getRemainingAvailableResources(settings);
        const remainingHexesNeeded: number = settings.requiredHexesCount - minimumsCount;
        map = this.addTerrainsToMap(map, remaining, remainingHexesNeeded);
        return map;
    }

    private addTerrainsToMap(map: SeafarersMap, terrains: Terrain[], numHexesToAdd: number): SeafarersMap {
        for (let i = 0; i < numHexesToAdd; i++) {
            const terrain = this.randomService.getRandomElementFromArray(terrains);
            terrains = this.arrayService.removeFirstOccurrence(terrains, (x: Terrain) => x === terrain);
            const randomCoords = this.getRandomUnusedCoords(map);
            map.setHexTerrain(randomCoords.randomRow, randomCoords.randomCol, terrain);
        }
        return map;
    }

    private getMinimumResources(settings: MapSettings): Terrain[] {
        let minimums: Terrain[] = new Array<Terrain>();
        for (const terrain of settings.terrainTypes) {
            const minTerrainCount: number = settings.terrainCounts.get(terrain).min;
            minimums = this.addTerrainToArrayXTimes(minimums, terrain, minTerrainCount);
        }
        return minimums;
    }

    private getRemainingAvailableResources(settings: MapSettings): Terrain[] {
        let remaining: Terrain[] = new Array<Terrain>();
        for (const terrain of settings.terrainTypes) {
            const remainingTerrainCount: number =
                settings.terrainCounts.get(terrain).max - settings.terrainCounts.get(terrain).min;
            remaining = this.addTerrainToArrayXTimes(remaining, terrain, remainingTerrainCount);
        }
        return remaining;
    }

    public getAllAvailableTerrainsPool(settings: MapSettings): Terrain[] {
        let allAvailableTerrains: Terrain[] = new Array<Terrain>();
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Brick,
            settings.terrainCounts.get(Terrain.Brick).max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Desert,
            settings.terrainCounts.get(Terrain.Desert).max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Gold,
            settings.terrainCounts.get(Terrain.Gold).max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Rock,
            settings.terrainCounts.get(Terrain.Rock).max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Sea,
            settings.terrainCounts.get(Terrain.Sea).max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Sheep,
            settings.terrainCounts.get(Terrain.Sheep).max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Tree,
            settings.terrainCounts.get(Terrain.Tree).max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Wheat,
            settings.terrainCounts.get(Terrain.Wheat).max
        );
        return allAvailableTerrains;
    }

    private addTerrainToArrayXTimes(array: Terrain[], terrain: Terrain, x: number): Terrain[] {
        for (let i = 0; i < x; i++) {
            array.push(terrain);
        }
        return array;
    }

    private getRandomUnusedCoords(map: SeafarersMap): any {
        let randomRow: number = this.randomService.getRandomNumberExclusive(0, map.getRows().length);
        let randomCol: number = this.randomService.getRandomNumberExclusive(0, map.getRow(randomRow).length);
        let hexIsEmptyTerrain: boolean = map.getHex(randomRow, randomCol).getTerrain() === Terrain.Empty;
        if (hexIsEmptyTerrain) {
            return { randomRow, randomCol };
        } else {
            while (!hexIsEmptyTerrain) {
                randomRow = this.randomService.getRandomNumberExclusive(0, map.getRows().length);
                randomCol = this.randomService.getRandomNumberExclusive(0, map.getRow(randomRow).length);
                hexIsEmptyTerrain = map.getHex(randomRow, randomCol).getTerrain() === Terrain.Empty;
            }
            return { randomRow, randomCol };
        }
    }
}
