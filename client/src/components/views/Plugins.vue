<template>

<div class="container">
    <div class="box">
        <div class="rectangle meteo">
            <div class="header"><i class="fa fa-cloud-sun fa-2x"></i></div>
            <div class="under-item bolder">Villiers sur Marne</div>
            <div v-for="(item, index) in meteo" :key="index+item.wind">
                    <div class="under-item">
                        <img :src="item.img"/>
                        <span>{{item.time}}</span>
                        <span>{{item.degree}}</span>
                        <span>{{item.rains}}<i class="fa fa-cloud-rain"></i></span>
                        <span>{{item.wind}}<i class="fa fa-wind"></i></span>
                    </div>   
            </div>
        </div>

        <div class="rectangle transport">
            <div class="header"><i class="fa fa-subway fa-2x"></i></div>
            <div class="under-item bolder">RER E - Villiers sur marne</div>
            <div class="under-item bolder first-line">
                    <span>Train</span>
                    <span>Départ</span>
                    <span>Arrivée</span>
                </div>      
            <div v-for="(item, index) in transports" :key="index+item.name">
                <div class="under-item">
                    <span>{{item.name}}</span>
                    <span class="bolder">{{item.time}}</span>
                    <span>{{item.arrive}}</span>
                </div>        
            </div>
        </div>


        <div class="rectangle sport">
            <div class="header"><i class="fa fa-dumbbell fa-2x"></i></div>
            <div class="under-item bolder">Fitness Park - Villiers/Noisy</div>
            <div class="under-item">
                <div class="big-text bolder">{{sport}} <i class="fa fa-male"></i> </div>
            </div>        
        </div>

        <div class="rectangle traffics">
            <div class="header"><i class="fa fa-hard-hat fa-2x"></i></div> 
            <div v-for="(item, index) in traffics" :key="index+item.description">
                    <div class="under-item">
                        <span class="bolder">{{item.axe}}</span>
                        <span>{{item.description}}</span>
                    </div>        
            </div>
        </div>

        <div class="rectangle maps">
            <div class="header"><i class="fa fa-road fa-2x"></i></div>
            <div class="under-item bolder">Villiers sur marne - Morangis</div>
            <div class="under-item">
                <span class="bolder big-text">{{maps.duration}}</span>
                <span>{{maps.distance}}</span>
            </div>        
        </div>
    </div>
</div>
</template>
<script src="../services/pluginService.js"></script>