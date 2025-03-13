using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace backend.Controllers;

using backend.Models;

[ApiController]
[Route("[controller]")]
public class BowlingLeagueController : ControllerBase
{
    private readonly BowlingLeagueContext _context;

    public BowlingLeagueController(BowlingLeagueContext context)
    {
        _context = context;
    }

    [HttpGet(Name = "GetBowler")]
    public IEnumerable<object> Get()
    {
        var bowlersWithTeams = _context.Bowlers
            .Join(_context.Teams,
                bowler => bowler.TeamId,  // Bowler's TeamId column
                team => team.TeamId,      // Team's TeamId column
                (b, t) => new     // Project a new anonymous object
                {
                    BowlerId = b.BowlerId,
                    BowlerFirstName = b.BowlerFirstName,
                    BowlerMiddleInit = b.BowlerMiddleInit,
                    BowlerLastName = b.BowlerLastName,
                    TeamName = t.TeamName,
                    Address = b.BowlerAddress,
                    City = b.BowlerCity,
                    State = b.BowlerState,
                    PhoneNumber = b.BowlerPhoneNumber,
                    Zip = b.BowlerZip
                })
            .ToList();

        return bowlersWithTeams;
    }
}
